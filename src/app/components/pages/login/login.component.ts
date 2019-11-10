import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  formError = {
    error: false,
    message: ''
  };

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  formSubmit( form ) {

    if ( this.user.email && this.user.password ) {

      this.user.email = this.user.email.toLowerCase();

      this.authService.tryLogin( this.user ).pipe(
        catchError( (err: any) => {
          this.formError.error = true;
          this.formError.message = err.error.message;
          return throwError(err);
        } )
      ).subscribe( (res: any) => {
        this.authService.saveUserInStorage(res.user, res.token);
        this.router.navigate(['/home']);
      });

    } else {
      this.formError.error = true;
      this.formError.message = 'Completa los campos vacios';
    }

  }

}
