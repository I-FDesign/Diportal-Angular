import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {}

  canActivate() {

    return this.afAuth.authState.pipe(
      map ( user => {
        if ( user ) {
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }

      } )
    );
  }

}
