import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Submission } from '../../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }
    
    getSubmissionById(courseId: string): Observable<Submission> {
      return this.http.get<Submission>(`http://localhost:3000/api/submissions/${courseId}`);
    }
        
    getAllSubmissions(): Observable<Submission[]> {
      return this.http.get<Submission[]>(`http://localhost:3000/api/submissions`);
    }
        
    addSubmission(course: any): Observable<Submission> {
      return this.http.post<Submission>(`http://localhost:3000/api/submissions`,course);
    }
        
    updateSubmission(id: any, grade: any): Observable<Submission> {
      return this.http.put<Submission>(`http://localhost:3000/api/submissions/${id}`, { grade: grade });
    }
        
        
    deleteSubmission(id: number): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/api/submissions/${id}`);
    }
}
