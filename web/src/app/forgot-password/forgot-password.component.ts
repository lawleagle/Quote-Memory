import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email = '';
  constructor(private authenticaitonService : AuthenticationService) { }

  ngOnInit() {
  }

  submit() {
    this.authenticaitonService.forgotPassword(this.email).subscribe(response => {});
  }

}
