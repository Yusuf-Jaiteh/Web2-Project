import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  
  constructor(private dataservice: DataService,private router:Router) {}
  
  
  onSubmit(email: string, password: string) {
    this.dataservice.onSubmit(email,password)
  }
  
  onsubmit2(email: string, password: string){
    this.dataservice.onSubmit2(email,password);
    
  }
 
}
