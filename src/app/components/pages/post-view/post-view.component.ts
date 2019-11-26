import { Component, OnInit } from '@angular/core';
import { AnuncioService } from '../../../services/anuncio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Anuncio } from '../../../models/anuncio.model';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})
export class PostViewComponent implements OnInit {

  postId: string;

  anuncio: Anuncio = new Anuncio();

  constructor(
    private anuncioService: AnuncioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe( params => {
      this.postId = params.get('id');
    } );
   }

  ngOnInit() {

    this.anuncioService.getAnuncio( this.postId ).subscribe( (res: any) => {
      if (res.anuncios.length === 0) {
        this.router.navigate(['**']);
      } else {
        this.anuncio = res.anuncios[0];
        console.log(this.anuncio);
      }
    } );

  }

}
