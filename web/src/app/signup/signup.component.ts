import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  success = null;
  error = null;
  email = '';
  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    this.authenticationService.forgotPassword(this.email).subscribe(response => {
      console.log(response);
      if (response.success) {
        this.success = "Password reset token is on it's way to your email.";
        this.error = null;
      }
      else {
        this.success = null;
        this.error = "Invalid email";
      }
    })
  }

}
