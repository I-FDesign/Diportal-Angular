import { Component, OnInit } from '@angular/core';
import { ContactModalService } from '../../../../services/contact-modal.service';
import { ContactMessage } from 'src/app/models/contact-message';

declare var swal;

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: ContactMessage[] = [];

  constructor(
    private contactModalService: ContactModalService
  ) {
    this.getMessages();
   }

  ngOnInit() {
  }

  getMessages() {
    this.contactModalService.getMessages().subscribe( messages =>{
      this.messages = messages;
      console.log(messages);
    } );
  }

  removeMessage(message: ContactMessage) {
    this.contactModalService.deleteMessage(message._id).subscribe( (res: any) => {
      swal('Mensaje eliminiado', res.message, 'success');
    } );
  }

}
