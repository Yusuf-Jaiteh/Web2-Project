// import { Component, Input } from '@angular/core';
// import { ActivatedRoute, RouterLink } from '@angular/router';
// import { CourseService } from '../services/course/course.service';
// import { CourseContentComponent } from '../components/course-content/course-content.component';
// import { CourseOverviewComponent } from '../components/course-overview/course-overview.component';

// @Component({
//   selector: 'app-lesson',
//   imports: [CourseContentComponent, CourseOverviewComponent, RouterLink],
//   templateUrl: './lesson.component.html',
//   styleUrl: './lesson.component.css'
// })
// export class LessonComponent {

//   selectedLesson: any = null;
//   obj: any;

//   constructor(
//     private route: ActivatedRoute,
//     private courseService: CourseService
//   ) {}

//    // Get course details by ID
//    ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       const courseId = params.get('courseId');
//       this.getCourse(courseId);
//     });
//   }

//    // Fetch course data by course ID
//    getCourse(courseId: string | null) {
//     if (courseId) {
//       this.courseService.getCourseById(courseId).subscribe(course => {
//         this.obj = course;
//       });
//     }
//   }

//   // When a lesson is selected from the Course Overview
//   onLessonSelected(lesson: any) {
//     this.selectedLesson = lesson;
//   }

//   // Handle lesson navigation (Next/Previous)
//   onLessonNavigation(direction: string) {
//     if (this.selectedLesson) {
//       const currentIndex = this.obj.lessons.indexOf(this.selectedLesson);
//       if (direction === 'prev' && currentIndex > 0) {
//         this.selectedLesson = this.obj.lessons[currentIndex - 1];
//       } else if (direction === 'next' && currentIndex < this.obj.lessons.length - 1) {
//         this.selectedLesson = this.obj.lessons[currentIndex + 1];
//       }
//     }
//   }
  
// }
