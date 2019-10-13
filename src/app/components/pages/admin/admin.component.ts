import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = new User();

  constructor(
    public authService: AuthenticationService,
    public afs: AngularFirestore,
    public router: Router
  ) { }

  ngOnInit() {
  }

  createUser( user ) {

    this.authService.tryRegister( this.user ).then( res => {
      const newUser = JSON.parse(JSON.stringify(this.user));
      newUser.password = '';
      newUser.email = newUser.email.toLowerCase();

      this.afs.collection('users').add( newUser ).then( resp => {
        console.log('User created');
        this.authService.logout();
        this.router.navigate(['/login']);
      } );
    } );

  }

}
