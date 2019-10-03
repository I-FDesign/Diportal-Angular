import { Component, OnInit } from '@angular/core';
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

    if (!this.filters.cmun && this.filters.termino) {
      this.filters.cmun = this._searchInputService.temporalyResult.fields.cmun;
    }

    localStorage.removeItem('filter');
    localStorage.setItem('filter', JSON.stringify(this.filters));

    this.router.navigate(['/search']);

  }

}
