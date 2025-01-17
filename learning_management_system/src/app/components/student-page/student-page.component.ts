import { Component, input } from '@angular/core';
import { course, Student } from '../../model/data.model';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-student-page',
  imports: [CommonModule],
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent {

  Courses: course[] = []

registeredCourses(): any {
   return this.Courses.filter((course: course) => course.registerState === 'Unregister');
}

  students: Student[] = [
    {
      _id: 0,
      name: 'sankung',
      email: 'sj22316079@utg.edu.gm',
      courses: []
    },
    {
      _id: 1,
      name: 'modou',
      email: 'mod23@gmail.com',
      courses: []
    }
  ];
 constructor(private dataservice: DataService) {}
   getname(){
    return this.dataservice.studentname;
   }

   
  // Method to get all courses
  ngOnInit(): void{
      this.dataservice.getcourses().subscribe(data =>{
      this.Courses = data;
   });
  }


  RegisterState(course:course){
    alert('course '+course.registerState+"ed successfully!");
    if(course.registerState == 'Unregister'){
      course.registerState = "Register"
    }
    else{
      course.registerState = 'Unregister'
    }
     
  }





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
