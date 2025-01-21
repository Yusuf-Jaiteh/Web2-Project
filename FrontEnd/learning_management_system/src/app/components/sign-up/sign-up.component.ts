import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../model/course.model';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule,RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private router: Router,private fb: FormBuilder) {
  
    this.addUserForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      username: [''],
      password: [''],
      role: ['Student']
    });
  
  }

  userService = inject(UserService);
  isDetails: boolean = false;
  addUserForm: FormGroup;
  user?: User;

  completeDetails(){
    this.isDetails = !this.isDetails;
  }

  handleSubmit(){
    const user = this.addUserForm.value;
  
    this.userService.addUser(user).subscribe(
      (response: any) => {
        this.user = response;

      },
      (error: any) => {
  
        console.log(error.error)
      }
    );
  
    this.router.navigate(['/signin']);
  }

}
