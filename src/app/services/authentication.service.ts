import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;
  token: string;

  constructor(
    private http: HttpClient
  ) {
    if (!this.user || !this.token) {
      if (localStorage.getItem('token') && localStorage.getItem('user')) {
        this.getStorage();
      }
    }
   }

   tryRegister( user: User ) {

    let url = BACKEND_URL + '/users/register';
    url += '?token=' + this.token;

    return this.http.post(url, user); 

  }

  tryLogin( user ) {
    const url = BACKEND_URL + '/users/login';

    return this.http.post(url, user);
  }

  saveUserInStorage(user: User, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getStorage() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = '';
    this.user = new User();
  }

}
