import { Component, OnInit, EventEmitter } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { Router } from '@angular/router';
import { SearchInputService } from '../../../services/search-input.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  filters: Filters = new Filters('');

  constructor(
    // tslint:disable-next-line: variable-name
    public _searchInputService: SearchInputService,
    public router: Router
  ) {
   }

  ngOnInit() {

    this._searchInputService.notification.subscribe( location => {
      this.filters.termino = location.fields.municipio + ', ' + location.fields.provincia + ' Provincia';
      this.filters.cmun = location.fields.cmun;
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

    localStorage.removeItem('filter');
    localStorage.setItem('filter', JSON.stringify(this.filters));

    this.router.navigate(['/search']);

  }

}
