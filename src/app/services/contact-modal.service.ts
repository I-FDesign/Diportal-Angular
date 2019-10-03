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

  openModal( emailOrEnterprise: string ) {

    if (emailOrEnterprise === 'empresa') {
      this.recipientsEmail = CONTACT_EMAIL;
      this.enterpriseMode = true;
    }

    this.recipientsEmail = emailOrEnterprise;

    $('#exampleModal').modal('show');
  }

}
