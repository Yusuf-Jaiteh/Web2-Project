import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../services/course/course.service';
import { UserService } from '../../services/user/user.service';
import {  EnrollmentService } from '../../services/enrollment/enrollment.service';
import { Course, Enrollment, User } from '../../model/course.model';
import { FormsModule } from '@angular/forms';
import { CourseEditServiceService } from '../../services/courseEdit/course-edit-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit{
  role: any = localStorage.getItem('role');

  constructor(private router: Router, private courseEditService: CourseEditServiceService) {}



  courses?: any[];
  users?: User[];
  user?: any;
  courseLength?: number;
  id: any = localStorage.getItem('id');
  enrollment: any;
  courseService = inject(CourseService);
  enrollmentService = inject(EnrollmentService);
  userService = inject(UserService);

  ngOnInit() {   
    this.getAllUsers();  
    if(this.role === 'Student'){
      this.getAllCourses();
    } else if(this.role === 'Instructor'){
      this.getCourseByUserId();
    } else if(this.role === 'Admin'){
      this.getAllCourses();
    }
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    })
  }

  addEnrollment(course: any){
    // Create the enrollment object with course, user, and enrollment date
  const enrollmentData = {
    course: course,
    user: localStorage.getItem('id'),
    enrollmentDate: new Date()  // Current date and time
  };

  // Call the enrollment service with the enrollment data
  this.enrollmentService.addEnrollment(enrollmentData).subscribe((enrollment: Enrollment) => {
    this.enrollment = enrollment;  // Handle the response if necessary
    this.getAllCourses()
  });
  }

  getCourseByUserId(){
    this.courseService.getCourseByInstructor(this.id).subscribe((course: Course[]) =>{
      this.courses = course;
      this.courseLength = this.courses.length;
    })
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((course: any[]) => {
      this.courses = course;
      this.courseLength = this.courses.length;
    })
  }

  handleDeleteCourse(courseId: string) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).subscribe(
        (response) => {
          this.getAllCourses();  // Refresh the course list
        },
        (error) => {
          console.error('Error deleting course:', error);
        }
      );
    }
  }
  


  // New method to handle "Edit" button click
  handleEditCourse(course: Course) {
    this.courseEditService.setCourseToEdit(course);  // Set the course to edit
  }
  

}
