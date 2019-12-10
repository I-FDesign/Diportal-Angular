import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ADMIN_ROUTES } from './admin.routes';
import { UsersComponent } from './users/users.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { ImportComponent } from './import/import.component';



@NgModule({
  declarations: [
    UsersComponent,
    MessagesComponent,
    ImportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ADMIN_ROUTES
  ]
})
export class AdminModule { }
