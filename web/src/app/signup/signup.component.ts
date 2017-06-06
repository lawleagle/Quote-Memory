import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  success = null;
  error = null;
  email = '';
  password = '';
  passwordRepeat = '';
  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    if (this.password === '') {
      this.error = "Password field cannot be empty!";
      return;
    }
    if (this.password !== this.passwordRepeat) {
      this.error = "Passwords do not match!";
      return;
    }
    this.success = null;
    this.error = null;
    this.authenticationService.signup(this.email, this.password).subscribe(response => {
      console.log(response);
      if (response.success) {
        this.success = "Sign up successfull! Check your email to activate your account.";
        this.error = null;
      }
      else {
        this.success = null;
        this.error = response.errorMessage;
      }
    })
  }

}
