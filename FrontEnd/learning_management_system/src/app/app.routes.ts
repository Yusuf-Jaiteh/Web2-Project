import { Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LecturerPageComponent } from './components/lecturer-page/lecturer-page.component';
import { StudentPageComponent } from './components/student-page/student-page.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { CourseListComponent } from './components/course-list/course-list.component';

export const routes: Routes = [
    {
       path:'',
       redirectTo:'signin',
       pathMatch:'full' 
    },

    {
        path: 'signup',
        component: SignUpComponent
    },

    {
        path: 'lecturer',
        component: LecturerPageComponent
    },

    {
        path: 'student',
        component: StudentPageComponent
    },


    {
        path: 'admin',
        component: AdminComponentComponent
    },


    {
        path: 'courses',
        component: CourseListComponent
    },


    {
        path: 'signin',
        component: SignInComponent
    }
];
