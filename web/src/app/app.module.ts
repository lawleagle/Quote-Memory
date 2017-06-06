import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { AddQuoteComponent } from './add-quote/add-quote.component';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { QuizComponent } from './quiz/quiz.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { AuthenticationService } from './services/authentication.service';
import { QuoteService } from './services/quote.service';
import { StatisticsService } from './services/statistics.service';
import { LoadingComponent } from './loading/loading.component';

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
    QuizComponent,
    StatisticsComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthenticationService,
    QuoteService,
    StatisticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
