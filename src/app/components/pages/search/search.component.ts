import { Component, OnInit } from '@angular/core';
import { Filters } from '../../../models/filters.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filters: Filters =  new Filters('');

  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('filter')) {
      const filters = JSON.parse(localStorage.getItem('filter'));
      this.filters = filters;
      console.log(this.filters);
    }
  }

}
