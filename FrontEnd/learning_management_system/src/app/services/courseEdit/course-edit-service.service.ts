import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Course } from '../../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseEditServiceService {

  constructor() { }

  private courseSubject = new BehaviorSubject<Course | null>(null);
  course$ = this.courseSubject.asObservable();

  // Method to update the course being edited
  setCourseToEdit(course: Course) {
    this.courseSubject.next(course);
  }
}
