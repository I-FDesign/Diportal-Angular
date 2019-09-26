import { Component, OnInit } from '@angular/core';
import { faHeart, faHome, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { Filters } from '../../../models/filters.model';
import { HomeService } from '../../../services/services.index';
import { Router } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  faHeartSolid = faHeart;
  faHeartRegular = faHeartRegular;
  faHome = faHome;
  faDollarSign = faDollarSign;

  filters: Filters = new Filters('');

  municipalitys: any[] = [];
  results: any[] = [];

  temporalyResult: any = {};


  constructor(
    // tslint:disable-next-line: variable-name
    public _homeService: HomeService,
    public router: Router
  ) {
   }

  ngOnInit() {
    if (localStorage.getItem('filter')) {
      const filters = JSON.parse(localStorage.getItem('filter'));
      this.filters = filters;
    }
  }

  filtersChanged( filter ) {
    this.filters.queDesea = filter;
  }

  clearTerm() {
    this.filters = new Filters('');
    this.results = [];
    this.municipalitys = [];
  }

  getFirstResult() {
    if ( this.municipalitys.length > 0 ) {
      this.temporalyResult = this.municipalitys[0];
      return;
    }
  }

  optionSelected( option, type: string ) {
    this.temporalyResult = option;

    this.results = [];
    this.municipalitys = [];

    if ( type ===  'municipality' ) {
      this.filters.termino = option.fields.municipio + ', ' + option.fields.provincia + ' Provincia';
      return;
    }

    if ( type ===  'result' ) {
      this.filters.termino = option.fields.municipio + ', ' + option.fields.provincia + ' Provincia';
      return;
    }


  }

  searchLocation( ) {
    this.results = [];

    if (this.filters.termino.length >= 3) {

      // Averiguando si es un codigo postal
      const postalCode = parseInt(this.filters.termino, 10);

      // No es un CP
      if (Number.isNaN(postalCode)) {

        this._homeService.searchMunicipalitys( this.filters.termino ).subscribe( (municipalitys: any[]) => {
          this.municipalitys = this._homeService.municipalitys;

          // Obteniendo un resultado por defecto
          this.getFirstResult();

        });

      // Es un CP
      } else {
        this._homeService.searchFromCP( this.filters.termino ).subscribe( (res: any[]) => {
          this.results = this._homeService.results;
        } );
      }

    } else {
      this.results = [];
      this.municipalitys = [];
    }
  }

  searchSubmit( form ) {
    this.filters = form;

    if (!this.filters.cmun && this.filters.termino) {
      this.filters.cmun = this.temporalyResult.fields.cmun;
    }

    localStorage.removeItem('filter');
    localStorage.setItem('filter', JSON.stringify(this.filters));

    this.router.navigate(['/search']);

  }

}
