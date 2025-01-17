import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student, user } from '../../model/data.model';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
[x: string]: any;
 constructor(private router: Router, private dataservice: DataService) {}

 // go to sign-up component method
  goTocomponent() {
 this.router.navigate(['/sign-up']);
}
  display: boolean = true;
  


   
users: user[] = [];
  // method to fetch all users from the service and assign it to users
ngOnInit(): void {
  this.dataservice.fetchAllUsers().subscribe((data) => {
    this.users = data;
  });
}
 
  // method to determine the display state 
  onclick(){
    if(this.display == false){
      this.display = true;
    }
    else{
      this.display = false;
    }
    
   }
    

 

  
}
