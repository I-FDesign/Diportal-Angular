import { Component, OnInit } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { SearchService } from '../../../services/search.service';
import { Anuncio } from '../../../models/anuncio.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  filters: Filters =  new Filters('');

  anuncios: Anuncio[] = [];

  constructor(
    public searchService: SearchService
  ) {
    this.getPosts();
   }

  ngOnInit() {
    if (localStorage.getItem('filter')) {
      const filters = JSON.parse(localStorage.getItem('filter'));
      this.filters = filters;
      // console.log(this.filters);
    }
  }

  getPosts() {
    this.searchService.getPosts().subscribe( (anuncios: any) => {
      this.anuncios = anuncios;
    } );
  }

}
