import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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
    public afs: AngularFirestore,
    public authService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  formSubmit( form ) {

    if ( this.user.email && this.user.password ) {

      this.user.email = this.user.email.toLowerCase();

      this.authService.tryLogin( this.user ).then( res => {
        this.router.navigate(['/home']);
      }, (err: any) => {
        this.formError.message = err.code;
      } );

    } else {
      this.formError.error = true;
    }

  }

}
