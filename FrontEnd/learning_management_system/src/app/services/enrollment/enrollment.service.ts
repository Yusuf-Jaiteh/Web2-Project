import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enrollment } from '../../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  constructor(private http: HttpClient) { }

      getEnrollmentById(courseId: string): Observable<Enrollment> {
        return this.http.get<Enrollment>(`http://localhost:3000/api/enrollments/${courseId}`);
      }
    
      getAllEnrollments(): Observable<Enrollment[]> {
        return this.http.get<Enrollment[]>(`http://localhost:3000/api/enrollments`);
      }
    
      addEnrollment(course: any): Observable<Enrollment> {
        return this.http.post<Enrollment>(`http://localhost:3000/api/enrollments`,course);
      }
    
      updateEnrollment(id: number, course: Enrollment): Observable<Enrollment> {
        return this.http.put<Enrollment>(`http://localhost:3000/api/enrollments/${id}`,course);
      }
    
    
      deleteEnrollment(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/api/enrollments/${id}`);
      }
    
}
