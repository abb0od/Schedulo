import { Routes } from '@angular/router';
import { AuthComponent } from './features/auth/auth.component';
import { SignupComponent } from './features/signup/signup.component';
import { MyAppointmentsComponent } from './features/myappointments/myappointments.component';
import { MainComponent } from './features/main/main.component';
    
export const routes: Routes = [
    {
        path: '',
        component: AuthComponent
    },
    {
        path: 'signup',
        component: SignupComponent  
    },
    {
        path: 'myappointments',
        component: MyAppointmentsComponent  
    },
    {
        path: 'main',
        component: MainComponent  
    }
];
