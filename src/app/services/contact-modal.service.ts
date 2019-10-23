import { Injectable } from '@angular/core';
import { CONTACT_EMAIL } from '../config/config';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ContactModalService {

  recipientsEmail: string;
  enterpriseMode = false;

  constructor() { }

  // Puede recibir un mail al cual enviar el contacto
  // o un valor 'new-user', el cual abrira el formulario para solicitar user
  openModal( contactOrNewUser: string ) {

    // La funcion se encarga de abrir un modal para el envio de un correo
    // para solicitar un usuario o para contactar con un publicador

    if (contactOrNewUser === 'new-user') {
      this.recipientsEmail = CONTACT_EMAIL;
      this.enterpriseMode = true;
    }

    this.recipientsEmail = contactOrNewUser;

    $('#contactModal').modal('show');
  }

}
