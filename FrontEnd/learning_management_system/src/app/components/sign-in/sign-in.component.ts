import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  ReactiveFormsModule  } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../model/course.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink,ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signInForm: FormGroup;
  apiResponse?: any;
  successMessage: string | null = null;  
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router) {
    this.signInForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }


  userService = inject(UserService);

  handleLogin(): void {
    const user = this.signInForm.value;
  
    this.userService.login(user).subscribe(
      (response: any) => {
        this.apiResponse = response;
        this.successMessage = 'Login successful! Welcome back.';
        this.errorMessage = null;

         // Assuming the response contains the necessary data
      const {  token, user: { firstName, lastName, role, id } } = response;

      // Storing data in local storage
      localStorage.setItem('role', role);
      localStorage.setItem('token', token);
      localStorage.setItem('firstname', firstName);
      localStorage.setItem('lastname', lastName);
      localStorage.setItem('id', id);
      if(role === 'Student'){
        this.router.navigate(['/student']);
      } else if(role === 'Instructor'){
        this.router.navigate(['/lecturer'])
      } else{
        this.router.navigate(['/admin'])
      }

      },
      (error: any) => {
  
        if (error.status === 400 && error.error) {
          this.errorMessage = error.error || 'An error occurred. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
        this.successMessage = null;
        
      }
    );
  }
  
}
