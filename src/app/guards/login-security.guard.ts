import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginSecurityGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    public router: Router
  ) {}

  canActivate() {

    if (this.authService.user && this.authService.token) {
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }

  }

}
