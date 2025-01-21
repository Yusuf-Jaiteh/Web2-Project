import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CourseListComponent } from '../course-list/course-list.component';
import { Lesson, Assignment } from '../../model/course.model';
import { FormGroup, FormBuilder,  ReactiveFormsModule  , FormsModule } from '@angular/forms';
import { Course } from '../../model/course.model';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course/course.service';
import { LessonService } from '../../services/lesson/lesson.service';
import { AssignmentService } from '../../services/assignment/assignment.service';
import { SubmissionService } from '../../services/submission/submission.service';

@Component({
  selector: 'app-lecturer-page',
  imports: [CourseListComponent,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './lecturer-page.component.html',
  styleUrl: './lecturer-page.component.css'
})
export class LecturerPageComponent implements OnInit{
  
  constructor(private router: Router,private fb: FormBuilder) {

    this.addLessonForm = this.fb.group({
      lessonTitle: [''],
      orderNumber: [''],
      course: [''],
      content: ['']
    });

    this.addAssignmentForm = this.fb.group({
      assignmentTitle: [''],
      description: [''],
      dueDate: [''],
      course: [''],
      pointsPossible: ['']
    });
  
  }
  ngOnInit(): void {
    this.getCourseByUserId();
    this.getAllSubmission();
  }

  submissionLength?: number;
  addLessonForm: FormGroup;
  submissionService = inject(SubmissionService);
  addAssignmentForm: FormGroup;
  submissions?: any[];
  courseService = inject(CourseService);
  assignmentService = inject(AssignmentService);
  lessonService = inject(LessonService);
  name: any = localStorage.getItem('firstname');
  id: any = localStorage.getItem('id');
  courses?: any[];
  isSidebar: boolean = false;
  action: string = "courselist";
  lesson?: any;
  gradeInputVisible: { [id: string]: boolean } = {};  // Object to track which grade input is visible
  gradeValue: { [id: string]: string } = {};  // Object to store the grade input value
  

  displaySidebar(){
    this.isSidebar = !this.isSidebar;
  }

  toggleGradeInput(submissionId: string): void {
    this.gradeInputVisible[submissionId] = !this.gradeInputVisible[submissionId];
  }

  

  getCourseByUserId(){
      const id: any = localStorage.getItem('id');
      this.courseService.getCourseByInstructor(id).subscribe((course: Course[]) =>{
        this.courses = course;
      })
    }

  handleAction(action: string){
    this.action = action;
  }

  getAllSubmission(){
    this.submissionService.getAllSubmissions().subscribe((submission: any[]) => {
      this.submissions = submission;
      this.submissionLength = this.submissions.length;
    })
  }

  handleLessonSave(){
    this.lessonService.addLesson(this.addLessonForm.value).subscribe((response: any) => {
      this.handleAction('courselist');
      this.addLessonForm.reset();
    }
    ,(error: any) => {
    
      if (error.status === 400 && error.error) {
        console.log(error.error)
    }
    }
    )
  }

  handleAssignmentSave(){
    this.assignmentService.addAssignment(this.addAssignmentForm.value).subscribe((response: any) => {
      this.handleAction('courselist');
      this.addAssignmentForm.reset();
    }
    ,(error: any) => {
    
      if (error.status === 400 && error.error) {
        console.log(error.error)
    }
    }
    )
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

  submitGrade(submissionId: string): void {
    const grade = this.gradeValue[submissionId];
    if (grade) {
      // Assuming `updateGrade` is the method that sends the grade to the backend
      this.submissionService.updateSubmission(submissionId, grade).subscribe(
        response => {
          // Hide the grade input field after submission
          this.gradeInputVisible[submissionId] = false;
          this.handleAction('gradeassignent');
          
        },
        error => {
          console.error('Error updating grade:', error);
        }
      );
    } else {
      console.error('Grade cannot be empty');
    }
  }
  
}
