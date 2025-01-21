import { Component, inject, OnInit } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Course, User } from '../../model/course.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseEditServiceService } from '../../services/courseEdit/course-edit-service.service';
import { CourseService } from '../../services/course/course.service';
import { FormGroup, FormBuilder,  ReactiveFormsModule  } from '@angular/forms';
import { FilterInstructorPipe } from './FilterInstructor.pipe';

@Component({
  selector: 'app-admin-component',
  imports: [CourseListComponent, FilterInstructorPipe,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './admin-component.component.html',
  styleUrl: './admin-component.component.css'
})
export class AdminComponentComponent implements OnInit{


constructor(private router: Router,private fb: FormBuilder, private courseEditService: CourseEditServiceService) {

  this.addCourseForm = this.fb.group({
    courseTitle: [''],
    description: [''],
    instructor: ['']
  });

  this.addUserForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    username: [''],
    password: [''],
    role: ['']
  });

}


  coursee: Course | null = null;
  addUserForm: FormGroup;
  addCourseForm: FormGroup;
  action: string = "courselist";
  userService = inject(UserService);
  courseService = inject(CourseService);
  users?: any[];
  courses?: any[];
  course?: Course;
  user?: User;
  name: any = localStorage.getItem('firstname');
  mode: string = 'add';
  isSidebar: boolean = false;

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllCourses();

    this.courseEditService.course$.subscribe((course) => {
      if (course) {
        this.coursee = course;  // Get the course details when set
        // Optionally, populate the form with course details
        this.handleEditCourse(course);
      }
    });
  }

  displaySidebar(){
    this.isSidebar = !this.isSidebar;
  }

  getAllUsers(){
      this.userService.getAllUsers().subscribe((users: any[]) => {
        this.users = users;
      })
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((courses: any[]) => {
      this.courses = courses;
    })
}

handleAction(action: string){
  this.action = action;
}

handleCourseAdd() {
  if (this.mode === 'update' && this.course) {
    // Update the course
    this.courseService.updateCourse(this.course._id, this.addCourseForm.value).subscribe((response: any) => {
      this.getAllCourses();  // Refresh the course list
      this.handleAction('courselist');  // Switch back to course list view
      this.addCourseForm.reset();  // Reset the form
    }, (error: any) => {
      console.error('Error updating course:', error);
    });
  } else {
    // Add a new course
    this.courseService.addCourse(this.addCourseForm.value).subscribe((response: any) => {
      this.getAllCourses();  // Refresh the course list
      this.handleAction('courselist');  // Switch back to course list view
      this.addCourseForm.reset();  // Reset the form
    }, (error: any) => {
      console.error('Error adding course:', error);
    });
  }
}


handleUserAdd() {
  if (this.mode === 'update' && this.user) {
    // If in update mode, use the user ID to update the user
    this.userService.updateUser(this.user._id, this.addUserForm.value).subscribe(
      (response) => {
        this.getAllUsers();
        this.handleAction('userlist');
        this.addUserForm.reset();
        this.mode = 'add';  // Reset to add mode after updating
      },
      (error) => {
        if (error.status === 400 && error.error) {
          console.log(error.error);
        }
      }
    );
  } else {
    // Normal add user flow
    this.userService.addUser(this.addUserForm.value).subscribe(
      (response) => {
        this.getAllUsers();
        this.handleAction('userlist');
        this.addUserForm.reset();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          console.log(error.error);
        }
      }
    );
  }
}


  handleEditUser(user: User) {
    this.action = 'adduser';  // Switch to the 'adduser' form to edit the user
    this.mode = 'update';  // Indicate that we're in update mode
    this.addUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: '',  // Don't pre-fill the password field
      role: user.role
    });
    this.user = user;  // Store the user to use their ID later
  }

  handleEditCourse(course: Course) {
    this.action = 'addcourse'; // Switch to course edit mode
    this.mode = 'update'; // Set mode to 'update'
    
    // Populate the form with course data
    this.addCourseForm.patchValue({
      courseTitle: course.courseTitle,
      description: course.description,
      instructor: course.instructor._id // assuming instructor is a user object with an `id`
    });

    this.course = course;
  }


  handleDeleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          this.getAllUsers();  // Refresh the user list
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  
  
  

  logout() {
    // Logic for clearing user session or token
    console.log('Logging out...');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');

    // Example: Redirect to login page after logging out
    this.router.navigate(['/signin']);
  }
}
