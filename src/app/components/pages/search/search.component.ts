import { Component, OnInit } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { SearchService } from '../../../services/search.service';
import { Anuncio } from '../../../models/anuncio.model';

import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
  ) {
    this.getPosts();
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
  }

  getPosts() {
    this.loading = true;

    this.searchService.getPosts().subscribe( (res: any) => {
      this.anuncios = res.anuncios;
      this.loading = false;
    } );
  }

  getPostsByFilter() {
    this.loading = true;

    const filters = {
      filters: this.filters
    };

    this.searchService.getPostsByFilters(filters).subscribe( (res: any) => {
      console.log(res.anuncios);
      this.anuncios = res.anuncios;
      this.loading = false;
    } );
  }

  provinceChanged(province) {
    this.loading = true;

    if (!province) {
      this.filters.provincia = '';
      return;
    }

    this.filters.provincia = province;

    this.getPostsByFilter();

  }

  searchPosts( term: string ) {
    if (!term) {
      this.filters.termino = '';
      return;
    }

    this.loading = true;

    this.filters.termino = term;

    this.getPostsByFilter();

  }

}
