import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../../model/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getCourseById(courseId: string): Observable<Course> {
    return this.http.get<Course>(`http://localhost:3000/api/courses/${courseId}`);
  }
  
  getCourseByInstructor(instructorId: string): Observable<Course[]> {
    return this.http.get<Course[]>(`http://localhost:3000/api/courses/instructor/${instructorId}`);
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`http://localhost:3000/api/courses`);
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(`http://localhost:3000/api/courses`,course);
  }

  updateCourse(id: any, course: any): Observable<Course> {
    return this.http.put<Course>(`http://localhost:3000/api/courses/${id}`,course);
  }


  deleteCourse(id: any): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/courses/${id}`);
  }
  
}
