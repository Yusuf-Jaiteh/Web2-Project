import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { LecturerPageComponent } from './components/lecturer-page/lecturer-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

export const routes: Routes = [
    {path:'',component:SignInComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-in', component: SignInComponent},
    {path:'student', component:StudentPageComponent},
    {path:'lecturer',component:LecturerPageComponent},
    {path:'admin',component:AdminComponent},
    {path:'add-course', component:AddCourseComponent}
];


