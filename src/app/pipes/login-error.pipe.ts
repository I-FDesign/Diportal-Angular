import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loginError'
})
export class LoginErrorPipe implements PipeTransform {

  transform(value: any): any {

    if (value === 'auth/invalid-email') {
      return 'Ingresa un email valido';
    }

    if (value === 'auth/user-not-found') {
      return 'El usuario no existe';
    }

    if (value === 'auth/wrong-password') {
      return 'La contraseña es incorrecta';
    }

    return null;
  }

}
