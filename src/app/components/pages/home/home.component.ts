import { Component, OnInit, EventEmitter } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { Router } from '@angular/router';
import { SearchInputService } from '../../../services/search-input.service';
import { SearchService } from '../../../services/search.service';
import { Anuncio } from '../../../models/anuncio.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filters: Filters = new Filters('');

  anuncios: Anuncio[] = [];

  constructor(
    // tslint:disable-next-line: variable-name
    public _searchInputService: SearchInputService,
    public searchService: SearchService,
    public router: Router
  ) {
    this.searchService.getPosts('').subscribe( (res: any) => {
      res.anuncios.docs.forEach((anuncio, index) => {
        if (index >= 4) {
          return;
        }
        this.anuncios.push(anuncio);
      });
    } );
   }

  ngOnInit() {

    this._searchInputService.notification.subscribe( location => {
      this.filters.termino = location;
    } );

    if (localStorage.getItem('filter')) {
      const filters = JSON.parse(localStorage.getItem('filter'));
      this.filters = filters;
    }
  }

  filtersChanged( filter ) {
    this.filters.queDesea = filter;
  }

  searchSubmit( form ) {
    this.filters = form;

    if (!this.filters.precioDesde) { this.filters.precioDesde = '0'; }
    if (!this.filters.precioHasta) { this.filters.precioHasta = '0'; }

    this.filters.provincia = '';
    this.filters.otherOptions = [];

    localStorage.removeItem('filter');
    localStorage.setItem('filter', JSON.stringify(this.filters));

    this.router.navigate(['/search']);

  }

}
