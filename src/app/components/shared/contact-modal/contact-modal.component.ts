import { Component, OnInit } from '@angular/core';
import { ContactModalService } from '../../../services/services.index';
import { ContactMessage } from '../../../models/contact-message';

declare var swal;

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styles: []
})
export class ContactModalComponent implements OnInit {

  message: ContactMessage = new ContactMessage();

  constructor(
    // tslint:disable-next-line: variable-name
    public _contactModalService: ContactModalService
  ) { }

  ngOnInit() {
  }

  sendMessage() {

    if (!this.message.name) {
      swal('Error', 'Debes ingresar un nombre', 'error');
      return;
    }

    if (!this.message.email) {
      swal('Error', 'Debes ingresar un email', 'error');
      return;
    }

    if (!this.message.content) {
      swal('Error', 'Debes ingresar un mensaje', 'error');
      return;
    }

    this._contactModalService.sendMessage(this.message)
      .subscribe( (res: any) => {
        swal('Mensaje enviado', res.message, 'success');
      } );
  }

}
