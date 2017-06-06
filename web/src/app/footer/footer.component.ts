import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
