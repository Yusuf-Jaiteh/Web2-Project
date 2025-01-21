// import { Component, OnInit, OnDestroy, Input, Output, EventEmitter  } from '@angular/core';
// import { LessonService } from '../../services/lesson/lesson.service';
// import { ActivatedRoute } from '@angular/router';
// import { Lesson } from '../../model/course.model';
// import { Subscription } from 'rxjs';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-course-content',
//   imports: [CommonModule],
//   templateUrl: './course-content.component.html',
//   styleUrl: './course-content.component.css'
// })
// export class CourseContentComponent implements OnInit, OnDestroy  {

//   lessons: any;
//   lesson?: any;
//   private routeSub: Subscription = new Subscription();
//   courseId: string = '';

//   constructor(
//     private route: ActivatedRoute,
//     private lessonService: LessonService
//   ) {}

//   ngOnInit(): void {
//     // Listen for route parameter changes
//     this.routeSub = this.route.paramMap.subscribe(params => {
//       this.courseId = params.get('courseId')!;
//       this.fetchLessonsForCourse(this.courseId);
//     });
//   }

//   ngOnDestroy(): void {
//     this.routeSub.unsubscribe();
//   }

//   // Fetch lessons for a specific course
//   private fetchLessonsForCourse(courseId: string): void {
//     this.lessonService.getLessonById(courseId).subscribe(lessons => {
//       this.lessons = lessons;
//     });
//   }

// }
