import { Component, inject, OnInit } from '@angular/core';
import { student } from '../../model/data.model';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from '../course-list/course-list.component';
import { CourseService } from '../../services/course/course.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { SubmissionService } from '../../services/submission/submission.service';

@Component({
  selector: 'app-student-page',
  imports: [CommonModule, CourseListComponent,ReactiveFormsModule],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css',
  providers: [DatePipe]
})
export class StudentPageComponent implements OnInit{

  constructor(private router: Router,private fb: FormBuilder, private datePipe: DatePipe) {
    this.addSubmissionForm = this.fb.group({
      assignment: [''],
      user: [''],
      course: [''],
      content: ['']
    });

  }


  ngOnInit(): void {
    this.getAllCourses();
    this.getAllAssignment();
    this.getAllSubmission();
  }
  
  assignmentLength?: number;
  submissionLength?: number;
  addSubmissionForm: FormGroup;
  courseService = inject(CourseService);
  assignmentService = inject(AssignmentService);
  submissionService = inject(SubmissionService);
  submissions?: any[];
  courses?: any[];
  assignments?: any[];
  name: any = localStorage.getItem('firstname');
  role: any = localStorage.getItem('role');
  id: any = localStorage.getItem('id');
  action: string = "courselist";
  isSidebar: boolean = false;
  isEnrolled: boolean = false;

  displaySidebar(){
    this.isSidebar = !this.isSidebar;
  }

  getAllCourses(){
    this.courseService.getAllCourses().subscribe((course: any[]) => {
      this.courses = course;
       // Check if the user is enrolled in any courses
       this.isEnrolled = this.courses.some(course =>
        course.enrollments.some((enro: { user: any; }) => enro.user === this.id) // Replace `this.id` with your actual user ID variable
      );
    })
  }

  getAllAssignment(){
    this.assignmentService.getAllAssignments().subscribe((assignment: any[]) => {
      this.assignments = assignment;
      this.assignmentLength = this.assignments.length;
    })
  }

  getAllSubmission(){
    this.submissionService.getAllSubmissions().subscribe((submission: any[]) => {
      this.submissions = submission;
      this.submissionLength = this.submissions.length;
    })
  }

  handleSubmission(course: any, assignment: any){
     // Change the action to show the submission form
     this.handleAction('submissionForm');

     // Pre-fill the form with course and assignment details
     this.addSubmissionForm.patchValue({
       course: course,
       assignment: assignment,
       content: '',  // Initialize with empty content
       user: this.id // Assuming this field exists
     });
  }

  onSubmit() {
    if (this.addSubmissionForm.valid) {
      // Extract form data
      const formData = this.addSubmissionForm.value;
      console.log(formData)
  
      // Assume the assignment service has a method to submit the form
      this.submissionService.addSubmission({
        course: formData.course,
        assignment: formData.assignment,
        content: formData.content,
        user: this.id,
        
        submissionDate: Date.now,
        grade: 0
      }).subscribe(response => {
        // Handle the response after submission
        // Redirect or show confirmation message if needed
        this.handleAction('allassignments');  // Go back to the list of assignments
      }, error => {
        console.error('Error submitting assignment:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
  

  handleAction(action: string){
    this.action = action;
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
