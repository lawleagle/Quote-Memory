import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error = '';
  isAuthenticated = false;
  currentUser = '';
  email = '';
  password = '';
  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.isAuthenticated().subscribe(response => {
      console.log(response);
      this.isAuthenticated = response.authenticated;
      if (response.authenticated) {
        this.currentUser = response.user;
      }
    });
  }

  login() {
    console.log("Login initiated...");
    this.authenticationService.login(this.email, this.password).subscribe(response => {
      console.log(response);
      this.isAuthenticated = response.authenticated;
      if (response.authenticated) {
        this.currentUser = response.user;
        window.location.href='';
      }
      else {
        this.error = response.errorMessage;
      }
    });
  }

}
