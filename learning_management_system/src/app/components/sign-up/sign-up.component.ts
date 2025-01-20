import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentPageComponent } from '../student-page/student-page.component';
import { Router } from '@angular/router';
import { user } from '../../model/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  
  constructor(private dataservice:DataService ,private router: Router) {}

  roles:string[] = ["student", "admin", "lecturer"];
  selectedRole: string = this.roles[0];
  users:user[] = [];

  adduser(_id:number,email:string,name:string,role:string,password:string){
    this.dataservice.adduser(_id,email,name,role,password)
  }

  

}




