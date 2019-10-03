import { Component, OnInit } from '@angular/core';
import { ContactModalService } from '../../../services/services.index';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styles: []
})
export class ContactModalComponent implements OnInit {


  constructor(
    // tslint:disable-next-line: variable-name
    public _contactModalService: ContactModalService
  ) { }

  ngOnInit() {
  }

}
