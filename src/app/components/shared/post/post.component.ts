import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faHome, faDollarSign, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ContactModalService } from '../../../services/contact-modal.service';
import { Anuncio } from '../../../models/anuncio.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  faHeartSolid = faHeart;
  faHeartRegular = faHeartRegular;
  faHome = faHome;
  faDollarSign = faDollarSign;
  faRulerHorizontal = faRulerHorizontal;

  isFavourite = false;

  // tslint:disable-next-line: no-input-rename
  @Input() modalId = '';

  @Input() anuncio: Anuncio;

  constructor(
    // tslint:disable-next-line: variable-name
    public _contactModalService: ContactModalService,
    private postService: PostService
  ) {
   }

  ngOnInit() {
    this.checkFavourite(this.anuncio._id);
  }

  openModal( email: string, anuncioTitle: string ) {

    this._contactModalService.openModal( email, anuncioTitle );

  }

  favouriteChanged( anuncioId: string ) {
    this.postService.favouriteChanged(anuncioId).subscribe( res => {
      this.checkFavourite(this.anuncio._id);
    } );
  }

  checkFavourite(anuncioId: string) {
    const isFavourite = this.postService.isFavourite(anuncioId);
    this.isFavourite = isFavourite;
  }

}
