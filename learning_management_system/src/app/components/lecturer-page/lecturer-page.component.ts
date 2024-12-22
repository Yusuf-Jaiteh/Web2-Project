import { Component } from '@angular/core';

@Component({
  selector: 'app-lecturer-page',
  imports: [],
  templateUrl: './lecturer-page.component.html',
  styleUrl: './lecturer-page.component.css'
})
export class LecturerPageComponent {
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
