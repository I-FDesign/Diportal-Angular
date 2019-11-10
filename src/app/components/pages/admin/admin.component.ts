import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../../../config/config';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user: User = new User();

  constructor(
    public router: Router,
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  createUser( user ) {

    this.authService.tryRegister(user).subscribe( res => {
      // usuario creado
    } );

  }

}
