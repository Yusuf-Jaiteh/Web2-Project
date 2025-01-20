import { Injectable } from '@angular/core';
import { course, user } from '../model/data.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {
  // Array of users
    private users: user[] = [];
  studentname: string = '';
  lectName: string = '';
     

    constructor(private router: Router,private http: HttpClient) { }
    
    private url = 'http://localhost:3001/users';
    private url2 = 'http://localhost:3000/AvailableCourses'
      
   
 
  
  // Method to get all users from the db
  fetchAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(this.url);
  }
   // method to get data from users array that we created and log in
   onSubmit(email: string, password: string): void {
    this.fetchAllUsers().subscribe(users => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        if (user.role === 'student') {
          this.studentname = user.name;
          this.router.navigate(['/student']);
        } else if (user.role === 'lecturer') {
          this.router.navigate(['/lecturer']);
        }else if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        }
        // Add more role-based redirections as needed
      } else {
        alert('Invalid email or password');
      }
    });
  }
    // method to get data from the json server and log in
    
    onSubmit2(email: string, password: string):void {
       this.http.get<user[]>(this.url).subscribe(users => {
        const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        alert('user found');
        if (user.role === 'student') {
          this.studentname = user.name;
          this.router.navigate(['/student']);
        }
         if (user.role === 'lecturer') {
          this.router.navigate(['/lecturer']);
        }
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        }
      } else {
        alert('Invalid email or password');
      }
      });
      
   }

   onSubmit3(email: string, password: string) {
    this.http.post<{ token: string, user: user }>(this.url, { email, password }).subscribe(
      response => {
        console.log('API response:', response);
        const token = response.token;
        const user = response.user;
  
        if (user.role === 'student') {
          this.studentname = user.name;
          this.router.navigate(['/student']);
        } else if (user.role === 'lecturer') {
          this.router.navigate(['/lecturer']);
        } else if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          alert('Invalid user role');
        }
      },
      
    );
  }
  

   // method to add a user to the db
   adduser(_id: number, email: string, name: string, role: string, password: string) {
    const newUser: user = { _id, email, name, role, password };
    this.http.post<user>(this.url, newUser).subscribe(
      response => {
       alert('User added successfully');
      }
      
    );
  }
  
  // all courses array
 private courses: course[] =[
      {
        name: 'web1', lecturer: 'ps jobe', registerState: 'Unregister',
        courseID: 0
      },
      {
        name: 'web1', lecturer: 'ousainou', registerState: 'Unregister',
        courseID: 0
      },
      {
        name: 'web2', lecturer: 'bamfa', registerState: 'Register',
        courseID: 0
      },
      {
        name: 'Database', lecturer: 'baboucarr', registerState: 'Register',
        courseID: 0
      },
      {
        name: 'Networking', lecturer: 'A fella', registerState: 'Register',
        courseID: 0
      }
    ]

    // Method to get all courses
    getCourses(): course[] {
        return this.courses;
    }

    // Method to get all cousrses from the db
    getcourses(): Observable<course[]> {
      return this.http.get<course[]>(this.url2);
    }
}