import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { UsersService } from 'src/app/services/users.service';

import swal from 'sweetalert';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user: User = new User();

  users: User[] = [];

  constructor(
    private usersService: UsersService
  ) {
    this.getUsers();
   }

  ngOnInit() {
  }

  getUsers() {
    this.usersService.getUsers().subscribe( users => {
      this.users = users;
    } );
  }

  createUser() {
    if (!this.user.name) {
      swal('Error', 'Debes ingresar un nombre', 'error');
      return;
    }

    if (!this.user.password) {
      swal('Error', 'Debes ingresar una contraseña', 'error');
      return;
    }

    if (!this.user.email) {
      swal('Error', 'Debes ingresar un email', 'error');
      return;
    }

    if (!this.user.inmobiliaria) {
      swal('Error', 'Debes ingresar un nombre de una inmobiliaria', 'error');
      return;
    }

    this.usersService.createUser(this.user).subscribe( (res: any) => {
      swal('Usuario creado', res.message, 'success');
    });
  }

}
