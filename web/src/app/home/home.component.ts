import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser = null;

  constructor(private authenticationService : AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.isAuthenticated().subscribe(response => {
      console.log(response);
      if (response.authenticated) {
        this.currentUser = response.user;
      }
    });
  }

  logout() {
    this.authenticationService.logout().subscribe(response => {
      window.location.href='';
    });
  }

}
