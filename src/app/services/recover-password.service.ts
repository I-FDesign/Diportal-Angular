import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class RecoverPasswordService {

  constructor(
    private http: HttpClient
  ) { }

  sendEmailToRecover(email: string) {
    const url = BACKEND_URL + '/password';

    const body = {
      email
    };

    return this.http.post(url, body);

  }

  resetPassword(newPassword, confirmNewPassword, token) {
    let url = BACKEND_URL + '/password/reset_password';
    url += '?token=' + token;

    const body = {
      newPassword,
      verifyPassword : confirmNewPassword
    };

    return this.http.post(url, body);

  }

}
