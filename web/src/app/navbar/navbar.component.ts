import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
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
