import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  
  constructor(private http: HttpClient) { }
  
  getLessonById(courseId: string): Observable<Lesson> {
    return this.http.get<Lesson>(`http://localhost:3000/api/lessons/${courseId}`);
  }
      
  getAllLessons(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`http://localhost:3000/api/lessons`);
  }
      
  addLesson(course: Lesson): Observable<Lesson> {
    return this.http.post<Lesson>(`http://localhost:3000/api/lessons`,course);
  }
      
  updateLesson(id: number, course: Lesson): Observable<Lesson> {
    return this.http.put<Lesson>(`http://localhost:3000/api/lessons/${id}`,course);
  }
      
      
  deleteLesson(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/api/lessons/${id}`);
  }
      
}
