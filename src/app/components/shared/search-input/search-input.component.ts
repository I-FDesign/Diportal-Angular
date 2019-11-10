import { Component, OnInit, EventEmitter } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { SearchInputService } from '../../../services/search-input.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  filters: Filters = new Filters('');

  municipalitys: any[] = [];
  results: any[] = [];


  constructor(
    // tslint:disable-next-line: variable-name
    public _searchInputService: SearchInputService
  ) { }

  ngOnInit() {
  }

  clearTerm() {
    this.filters = new Filters('');
    this.results = [];
    this.municipalitys = [];
  }

  getFirstResult() {
    if ( this.municipalitys.length > 0 ) {
      this._searchInputService.temporalyResult = this.municipalitys[0];
      return;
    }
  }

  searchLocation( ) {
    this.results = [];
    this.municipalitys = [];

    if (this.filters.termino.length >= 3) {

      // Averiguando si es un codigo postal
      const postalCode = parseInt(this.filters.termino, 10);

      // No es un CP
      if (Number.isNaN(postalCode)) {

        this._searchInputService.searchMunicipalitys( this.filters.termino ).subscribe( (municipalitys: any[]) => {
          this.municipalitys = this._searchInputService.municipalitys;

          // Obteniendo un resultado por defecto
          this.getFirstResult();

        });

      // Es un CP
      } else {
        this._searchInputService.searchFromCP( this.filters.termino ).subscribe( (res: any[]) => {
          this.results = this._searchInputService.results;
        } );
      }

    } else {
      this.results = [];
      this.municipalitys = [];
    }
  }

  optionSelected( option, type: string ) {
    this._searchInputService.temporalyResult = option;

    this.results = [];
    this.municipalitys = [];

    if ( type ===  'municipality' ) {
      this.filters.termino = option.fields.municipio + ', ' + option.fields.provincia + ' Provincia';
    }

    if ( type ===  'result' ) {
      this.filters.termino = option.fields.municipio + ', ' + option.fields.provincia + ' Provincia';
    }

    const location = {
      termino: this.filters.termino,
      terminoFormatted: (option.fields.municipio) ? option.fields.municipio : option.fields.provincia
    };

    this._searchInputService.emitOption(location);


  }

}
