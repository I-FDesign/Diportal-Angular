import { Component, OnInit } from '@angular/core';
import { RecoverPasswordService } from '../../../../services/recover-password.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['../login.component.css', './reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token: string;

  newPassword: string;
  confirmNewPassword: string;

  formError = {
    error: false,
    message: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recoverPasswordService: RecoverPasswordService
  ) {
    this.route.paramMap.subscribe( params => {
      this.token = params.get('token');
    } );
   }

  ngOnInit() {
  }

  formSubmit( form ) {

    if ( this.newPassword && this.confirmNewPassword ) {

      this.recoverPasswordService.resetPassword(
        this.newPassword,
        this.confirmNewPassword,
        this.token
      ).subscribe( (res: any) => {
        sweetAlert(
          res.message,
          'Su contraseña ha si reestablecida correctamente, pruebe iniciar sesión',
          'success'
        );

        this.router.navigate(['/login']);
      } );

    } else {
      this.formError.error = true;
      this.formError.message = 'Debes ingresar un contraseña y repetirla';
    }

  }

}
