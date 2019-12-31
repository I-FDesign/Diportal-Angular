import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnunciosService } from './anuncios.service';
import { Anuncio } from '../../../models/anuncio.model';

@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {

  anunciosType: string;

  anuncios: Anuncio[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private anunciosService: AnunciosService
  ) {
    this.route.paramMap.subscribe( params => {
      this.anunciosType = params.get('type');

      if (this.anunciosType !== 'favoritos' && this.anunciosType !== 'mis-anuncios') {
        this.router.navigate(['/home']);
      }

      this.getAnuncios();

    } );
   }

  ngOnInit() {
  }

  getAnuncios() {
    this.anunciosService.getPosts(this.anunciosType).subscribe( (anuncios: any) => {
      this.anuncios = anuncios;
    } );
  }

}
