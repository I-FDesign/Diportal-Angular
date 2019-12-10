import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getUsers() {
    let url = BACKEND_URL + '/users';
    url += '?token=' + this.authenticationService.token;

    return this.http.get(url).pipe( map( (res: any) => {
      return res.users;
    } ) );
  }

  createUser(user: User) {
    let url = BACKEND_URL + '/users/register';
    url += '?token=' + this.authenticationService.token;

    return this.http.post(url, user);
  }
}
