import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LecturerPageComponent } from "./components/lecturer-page/lecturer-page.component";
import { StudentPageComponent } from "./components/student-page/student-page.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
           SignUpComponent,
           SignInComponent,
           LecturerPageComponent, 
           StudentPageComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learning_management_system';
}
