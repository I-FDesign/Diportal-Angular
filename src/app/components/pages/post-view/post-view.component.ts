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

    this.anuncioService.getAnuncio( this.postId ).subscribe( (anuncio: any) => {
      if (anuncio.length === 0) {
        this.router.navigate(['**']);
      } else {
        this.anuncio = anuncio[0];
        this.getImagesUrl();
      }
    } );

  }

  getImagesUrl() {
    this.anuncio.imagenes.forEach(image => {
      this.anuncioService.getImageUrl(image).subscribe( url => {
        if (url) {
          image.downloadUrl = url;
        }
      });
    });
  }

}
