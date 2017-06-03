import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { QuizComponent } from './quiz/quiz.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const appRoutes : Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/forgotPassword', component: ForgotPasswordComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'quotes-list', component: QuotesListComponent },
    { path: 'add-quote', component: AddQuoteComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: '', redirectTo: '', pathMatch: 'full' }
]
