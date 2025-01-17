import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-lecturer-page',
  imports: [],
  templateUrl: './lecturer-page.component.html',
  styleUrl: './lecturer-page.component.css'
})
export class LecturerPageComponent {
 constructor(private router: Router,private dataservice: DataService) {}
  
  // go to add-course component method
   goTocomponent() {
  this.router.navigate(['/add-course']);
 }

 getname(){
  return this.dataservice.lectName;
 }

  display: boolean = true;
  display2: boolean = true;

  onclick(){
    if(this.display == false){
      this.display = true;
    }
    else{
      this.display = false;
    }
    
   }

   onclick2(){
    if(this.display2 == false){
      this.display2 = true;
    }
    else{
      this.display2 = false;
    }
    
   }
    
  
}
