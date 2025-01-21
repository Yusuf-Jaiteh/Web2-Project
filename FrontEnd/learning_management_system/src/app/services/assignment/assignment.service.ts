import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Assignment } from '../../model/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

    getAssignmentById(courseId: string): Observable<Assignment> {
      return this.http.get<Assignment>(`http://localhost:3000/api/assignments/${courseId}`);
    }
  
    getAllAssignments(): Observable<Assignment[]> {
      return this.http.get<Assignment[]>(`http://localhost:3000/api/assignments`);
    }
  
    addAssignment(course: Assignment): Observable<Assignment> {
      return this.http.post<Assignment>(`http://localhost:3000/api/assignments`,course);
    }
  
    updateAssignment(id: number, course: Assignment): Observable<Assignment> {
      return this.http.put<Assignment>(`http://localhost:3000/api/assignments/${id}`,course);
    }
  
  
    deleteAssignment(id: number): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/api/assignments/${id}`);
    }
  
}
