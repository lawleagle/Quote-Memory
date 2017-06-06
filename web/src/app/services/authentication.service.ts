import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

@Injectable()
export class AuthenticationService {
  private endpointUrl = '/api/';

  constructor(private http : Http) { }

   isAuthenticated() {
     return this.http.get(this.endpointUrl + 'isAuthenticated').map(response => response.json());
   }

   login(email, password) {
     return this.http.post(this.endpointUrl + 'login', {
       email: email,
       password: password
     }).map(response => response.json());
   }

   logout() {
     return this.http.get(this.endpointUrl + 'logout').map(response => response.json());
   }

   forgotPassword(email) {
     return this.http.post(this.endpointUrl + 'forgotPassword', {
      email: email
     }).map(response => response.json());
   }

   signup(email, password) {
     return this.http.post(this.endpointUrl + 'signup', {
       email: email,
       password: password
     }).map(response => response.json());
   }
}
