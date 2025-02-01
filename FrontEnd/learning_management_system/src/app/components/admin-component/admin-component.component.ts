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

  successMessage: string | null = null;  
  errorMessage: string | null = null;

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
  
    this.courseService.updateCourse(this.course._id, this.addCourseForm.value).subscribe((response: any) => {
      this.successMessage = 'Course Updated Succesfully.';
      setTimeout(() => this.mode = 'add', 2000);
        setTimeout(() => this.successMessage = null, 2000)
        this.errorMessage = null;
      this.getAllCourses();  
      setTimeout(() => {this.handleAction('courselist')}, 2100);
        
      this.addCourseForm.reset();  
    }, (error: any) => {
      this.errorMessage = 'Error updating course';
      setTimeout(() => this.errorMessage = null, 2000);
      console.error('Error updating course:', error);
    });
  } else {
    this.courseService.addCourse(this.addCourseForm.value).subscribe((response: any) => {
      this.successMessage = 'Course Created Succesfully.';
        setTimeout(() => this.successMessage = null, 2000)
        this.errorMessage = null;
      this.getAllCourses();  
      setTimeout(() => {this.handleAction('courselist')}, 2100)
      this.addCourseForm.reset();  
    }, (error: any) => {
      this.errorMessage = 'Error adding course';
      setTimeout(() => this.errorMessage = null, 2000);
      console.error('Error adding course:', error);
    });
  }
}


handleUserAdd() {
  if (this.mode === 'update' && this.user) {
    
    this.userService.updateUser(this.user._id, this.addUserForm.value).subscribe(
      (response) => {
        this.successMessage = 'User Updated Succesfully.';
        setTimeout(() => this.mode = 'add', 2000);
        setTimeout(() => this.successMessage = null, 2000)
        this.errorMessage = null;
        this.getAllUsers();
        setTimeout(() => {this.handleAction('userlist')}, 2100)
        this.addUserForm.reset();
        this.mode = 'add';  
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessage = 'Error updating user';
          setTimeout(() => this.errorMessage = null, 2000);
          console.log(error.error);
        }
      }
    );
  } else {
    
    this.userService.addUser(this.addUserForm.value).subscribe(
      (response) => {
        this.successMessage = 'User Created Succesfully.';
        setTimeout(() => this.successMessage = null, 2000)
        this.errorMessage = null;
        this.getAllUsers();
        setTimeout(() => {this.handleAction('userlist')}, 2100)
        this.addUserForm.reset();
      },
      (error) => {
        if (error.status === 400 && error.error) {
          this.errorMessage = 'Error adding user';
          setTimeout(() => this.errorMessage = null, 2000);
          console.log(error.error);
        }
      }
    );
  }
}


  handleEditUser(user: User) {
    this.action = 'adduser';  
    this.mode = 'update';  
    this.addUserForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      password: '',  
      role: user.role
    });
    this.user = user;  
  }

  handleEditCourse(course: Course) {
    this.action = 'addcourse'; 
    this.mode = 'update'; 
    
    
    this.addCourseForm.patchValue({
      courseTitle: course.courseTitle,
      description: course.description,
      instructor: course.instructor._id 
    });

    this.course = course;
  }


  handleDeleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(
        (response) => {
          this.successMessage = 'User Deleted Succesfully.';
          setTimeout(() => this.successMessage = null, 2000)
          this.errorMessage = null;
          setTimeout(() => {this.getAllUsers()}, 2100);
        },
        (error) => {
          this.errorMessage = 'Error adding user';
          setTimeout(() => this.errorMessage = null, 2000);
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  
  
  

  logout() {
    
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    this.successMessage = 'Logout Succesfully.';
    setTimeout(() => this.successMessage = null, 1000)
    this.errorMessage = null;
    setTimeout(() => {this.router.navigate(['/signin'])}, 1100)
  }
}
