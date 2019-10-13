import { Component, OnInit } from '@angular/core';
import { Anuncio } from '../../../models/anuncio.model';

declare function updateStyles();

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {

  anuncio: Anuncio = new Anuncio();

  constructor() {

   }

  ngOnInit() {
    updateStyles();
  }

  checkboxChange( checkBox, event ) {
      if (checkBox === 'diario') {
        this.anuncio.vacacional.diario.desea = event.srcElement.checked;
      }

      if (checkBox === 'semanal') {
        this.anuncio.vacacional.semanal.desea = event.srcElement.checked;
      }

      if (checkBox === 'mensual') {
        this.anuncio.vacacional.mensual.desea = event.srcElement.checked;
      }
  }

  moreOrLessInput(type, isLess) {
    if ( type === 'habitaciones' ) {
      if ( isLess ) {
        // tslint:disable-next-line: radix
        this.anuncio.ambientes = (parseInt(this.anuncio.ambientes) - 1).toString();
      } else {
        // tslint:disable-next-line: radix
        this.anuncio.ambientes = (parseInt(this.anuncio.ambientes) + 1).toString();
      }
    } else {
      if ( isLess ) {
        // tslint:disable-next-line: radix
        this.anuncio.bathrooms = (parseInt(this.anuncio.bathrooms) - 1).toString();
      } else {
        // tslint:disable-next-line: radix
        this.anuncio.bathrooms = (parseInt(this.anuncio.bathrooms) + 1).toString();
      }
    }
  }

  uploadAnuncio() {
    console.log(this.anuncio);
  }

}
