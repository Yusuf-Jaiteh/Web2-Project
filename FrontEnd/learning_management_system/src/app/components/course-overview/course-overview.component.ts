// import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { CourseService } from '../../services/course/course.service';
// import { Course } from '../../model/course.model';
// import { Lesson } from '../../model/course.model';
// import { CommonModule } from '@angular/common';
// import { RouterLink } from '@angular/router';

// @Component({
//   selector: 'app-course-overview',
//   imports: [CommonModule,RouterLink],
//   templateUrl: './course-overview.component.html',
//   styleUrl: './course-overview.component.css'
// })
// export class CourseOverviewComponent implements OnInit {

//   @Input() objj: any;  // Input course data
//   @Output() lessonSelected = new EventEmitter<any>();  // Event emitter to notify parent

//   course?: any;
//   obj?: any;
//   constructor(private courseService: CourseService) { }

//   selectLesson(lesson: any) {
//     this.lessonSelected.emit(lesson);
//   }

//   ngOnInit(): void {
//     this.getCourseById();
//   }


//   getCourseById(){
//     this.courseService.getCourseById("6785e2fd047af1c9af4dc22d").subscribe(course => {
//       this.course = course;
//       this.obj = this.course
//      });
//   }

// }
