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
      // console.log(this.filters);
    }
  }

  getPosts() {
    this.loading = true;

    this.searchService.getPosts().subscribe( (anuncios: any) => {
      this.anuncios = anuncios;
      this.loading = false;
    } );
  }

  provinceChanged(province) {
  this.loading = true;

  if (!province) {
    this.getPosts();
    return;
  }

  this.searchService.getPostsFromProvince( province )
    .subscribe( (anuncios: any) => {
      this.anuncios = anuncios;
      this.loading = false;
    } );
  }

  searchPosts( term: string ) {
    const anuncios = [];

    if (!term) {
      return;
    }

    for (const anuncio of this.anuncios) {
      if (
        anuncio.address.cp === term ||
        anuncio.address.poblacion.indexOf(term) > -1 ||
        anuncio.address.zona.indexOf(term) > -1
      ) {
        anuncios.push(anuncio);
      }
    }

    this.anuncios = anuncios;
  }

  applyFilters() {
    this.searchService.getPostsFromFilters(this.filters).subscribe( (anuncios: any) => {
      this.anuncios = anuncios;
    } );
  }

}
