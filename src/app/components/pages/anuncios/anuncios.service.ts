import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../../../config/config';
import { AuthenticationService } from '../../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }


  getPosts(anunciosType: string) {
    const limit = 0;

    let url = BACKEND_URL + '/anuncios/' + anunciosType;
    url += '?limit=' + limit;
    if (anunciosType === 'favoritos') {
      url += '&user=' + this.authService.user._id;
    }
    url += '&token=' + this.authService.token;

    return this.http.get(url);
  }
}
