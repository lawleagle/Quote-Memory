import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './authentication.service';
import { FooterComponent } from './footer/footer.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { QuoteService } from './quote.service';
import { QuizComponent } from './quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    FooterComponent,
    QuotesListComponent,
    AddQuoteComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthenticationService,
    QuoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
