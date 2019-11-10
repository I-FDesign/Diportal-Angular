import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

import sweetAlert from 'sweetalert';
import { BACKEND_URL } from '../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  favouriteChanged( anuncioId: string ) {
    if (!this.authService.user || !this.authService.token) {
      sweetAlert(
        'Debes iniciar sesión',
        'Inicia sesión para poder agreagar anuncios a favoritos!',
        'error'
      );
      return;
    }

    let url = BACKEND_URL + '/users/favourite';
    url += '?token=' + this.authService.token;

    const body = {
      user: this.authService.user._id,
      anuncio: anuncioId
    };

    return this.http.put(url, body).pipe(
      map( (res: any) => {
        this.authService.saveUserInStorage(res.userDB, this.authService.token);
        sweetAlert(
          'Han cambiado sus favoritos',
          res.message,
          'success'
        );
      } )
    );
  }

  isFavourite(anuncioId: string) {

    let isFavourite = false;

    if (!this.authService.user || !this.authService.token) {
      return isFavourite;
    }

    this.authService.user.favourites.forEach(favourite => {
      if (favourite === anuncioId) {
        isFavourite = true;
        return;
      }
    });

    return isFavourite;
  }
}
