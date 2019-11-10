import { Component, OnInit } from '@angular/core';
import { RecoverPasswordService } from '../../../../services/recover-password.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login.component.css', './recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  email: string;

  formError = {
    error: false,
    message: ''
  };

  constructor(
    private recoverPasswordService: RecoverPasswordService
  ) { }

  ngOnInit() {
  }

  formSubmit( form ) {

    if ( this.email ) {

      this.email = this.email.toLowerCase();

      this.recoverPasswordService.sendEmailToRecover( this.email )
        .subscribe( (res: any) => {
          sweetAlert(
            'Email enviado',
            res.message,
            'success'
          );
        } );

    } else {
      this.formError.error = true;
      this.formError.message = 'Completa los campos vacios';
    }

  }

}
