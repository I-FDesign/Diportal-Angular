import { Component, OnInit, Input } from '@angular/core';
import { faHeart, faHome, faDollarSign, faRulerHorizontal } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ContactModalService } from '../../../services/contact-modal.service';

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

  // tslint:disable-next-line: no-input-rename
  @Input() modalId = '';

  constructor(
    // tslint:disable-next-line: variable-name
    public _contactModalService: ContactModalService
  ) {
   }

  ngOnInit() {
  }

  openModal( email: string ) {

    this._contactModalService.openModal( email );

  }

}
