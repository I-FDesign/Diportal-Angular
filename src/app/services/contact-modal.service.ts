import { Injectable } from '@angular/core';
import { CONTACT_EMAIL, BACKEND_URL } from '../config/config';
import { ContactMessage } from '../models/contact-message';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ContactModalService {

  recipientsEmail: string;
  enterpriseMode = true;

  anuncioTitle: string;

  constructor(
    private http: HttpClient
  ) { }

  // Puede recibir un mail al cual enviar el contacto
  // o un valor 'new-user', el cual abrira el formulario para solicitar user
  openModal( contactOrNewUser: string, anuncioTitle: string ) {

    // La funcion se encarga de abrir un modal para el envio de un correo
    // para solicitar un usuario o para contactar con un publicador

    if (contactOrNewUser === 'new-user') {
      this.recipientsEmail = CONTACT_EMAIL;
      this.enterpriseMode = false;
    }

    this.recipientsEmail = contactOrNewUser;
    this.anuncioTitle = anuncioTitle;

    $('#contactModal').modal('show');
  }

  getMessages() {
    const url = BACKEND_URL + '/contact';

    return this.http.get(url).pipe( map( (res: any) => {
      return res.messages;
    } ) );
  }

  sendMessage(message: ContactMessage) {
    const url = BACKEND_URL + '/contact';

    const body = {
      recipientsEmail: this.recipientsEmail,
      anuncioTitle: this.anuncioTitle,
      enterpriseMode: this.enterpriseMode,
      name: message.name,
      email: message.email,
      message: message.content
    };

    return this.http.post(url, body);
  }

  deleteMessage(messageId: string) {
    const url = BACKEND_URL + '/contact/' + messageId;

    return this.http.delete(url);
  }

}
