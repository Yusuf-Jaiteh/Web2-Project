import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../model/course.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
      
      getUserById(userId: string): Observable<User> {
        return this.http.get<User>(`http://localhost:3000/api/users/${userId}`);
      }
          
      getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`http://localhost:3000/api/users`);
      }
          
      addUser(user: User): Observable<User> {
        return this.http.post<User>(`http://localhost:3000/auth/register`,user);
      }

      login(user: any): Observable<any> {
        return this.http.post<any>(`http://localhost:3000/auth/login`,user);
      }
          
      updateUser(id: any, user: any): Observable<User> {
        return this.http.put<User>(`http://localhost:3000/api/users/${id}`,user);
      }
          
          
      deleteUser(id: any): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/api/users/${id}`);
      }
}
