import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

export const appRoutes : Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/forgotPassword', component: ForgotPasswordComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
]
