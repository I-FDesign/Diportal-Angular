import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {
    this.afAuth.authState.subscribe( user => {
      if ( user ) {
        const collection = this.afs.collection('users', ref => ref.where( 'email', '==', user.email ));
        collection.valueChanges().subscribe( (userDB: any) => {
          if ( userDB ) {
            this.user = userDB[0];
          }
        } );
      }
    } );
   }


  tryLogin( user ) {
    return new Promise( (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword( user.email, user.password )
        .then( res => {
          resolve( res );
        }, err => reject( err ) );
    } );
  }

  tryRegister( user: User ) {

    return new Promise( (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword( user.email, user.password )
          .then( res => {
            resolve( res );
          }, err => reject( err ));
    } );

  }

  logout() {
    this.afAuth.auth.signOut();
    this.user = null;
  }

}
