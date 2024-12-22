import { Component } from '@angular/core';
import { student } from '../../model/data.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-page',
  imports: [CommonModule],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent {
  sanks: student = new student(1, 'sankung', 'sankung@gmail.com');
  students: student[] = [this.sanks];

  hide: boolean = true;
  hide2: boolean = true;
   


    onclick(){
      if(this.hide == true){
        this.hide = false
      }else{
        this.hide = true
      }
    
   }

   onclick2(){
    if(this.hide2 == true){
      this.hide2 = false
    }else{
      this.hide2 = true
    }
    
   }
}
