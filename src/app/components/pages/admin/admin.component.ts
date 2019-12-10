import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../../../config/config';
import { AuthenticationService } from '../../../services/authentication.service';

declare function loadScript();
declare function destroyScript();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  user: User = new User();

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    loadScript();
  }

  ngOnDestroy() {
    destroyScript();
  }

  createUser( user ) {

    this.authService.tryRegister(user).subscribe( res => {
      // usuario creado
    } );

  }

}
