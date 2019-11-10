import { Component, OnInit } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { SearchService } from '../../../services/search.service';
import { Anuncio } from '../../../models/anuncio.model';

import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInputService } from '../../../services/search-input.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  mapActive = false;

  filters: Filters =  new Filters('');

  anuncios: Anuncio[] = [];

  anuncio: Anuncio = new Anuncio();

  faPlus = faPlus;
  faCheck = faCheck;

  loading = false;

  constructor(
    public searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private searchInputService: SearchInputService
  ) {
    this.getPosts('');
    this.route.paramMap.subscribe( (params: any) => {
      if (params.get('type')) {
        if ( params.get('type') === 'mapa' ) {
          this.mapActive = true;
        } else {
          this.router.navigate(['/search']);
        }
      }
    } );
   }

  ngOnInit() {
    if (localStorage.getItem('filter')) {
      const filters = JSON.parse(localStorage.getItem('filter'));
      this.filters = filters;
    }

    this.searchInputService.notification.subscribe( optionSelected => {
      this.filters.termino = optionSelected.termino;
      this.getPostsByFilter();
    } );
  }

  checkboxChanged(option) {
    const formattedOption = this.searchService.transformFilter(option);
    if (this.filters.otherOptions.indexOf(formattedOption) < 0) {
      this.filters.otherOptions.push(formattedOption);
    } else {
      const otherOptions =
        this.filters.otherOptions.filter((value) => {
          return value !== formattedOption;
        });
      this.filters.otherOptions = otherOptions;
    }
  }

  getPosts(term: string) {
    this.loading = true;

    this.searchService.getPosts(term).subscribe( (res: any) => {
      this.anuncios = res.anuncios;
      this.loading = false;
    } );
  }

  getPostsByFilter() {
    this.loading = true;

    if (!this.filters.provincia) {
      delete this.filters.provincia;
    }

    if (!this.filters.terminoFormatted) {
      delete this.filters.terminoFormatted;
    }

    const filters = {
      filters: this.filters
    };

    this.searchService.getPostsByFilters(filters).subscribe( (res: any) => {
      this.anuncios = res.anuncios;
      this.loading = false;
    } );
  }

  provinceChanged(province) {

    if (!province) {
      this.filters.provincia = '';
      return;
    }

    this.filters.provincia = province;

  }

  searchPosts( term: string ) {

    this.filters.termino = term;
    this.filters.terminoFormatted = term;

    this.getPosts(term);

  }

}
