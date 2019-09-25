import { Component, OnInit } from '@angular/core';
import { ODS_URL } from '../../../config/config';
import { HttpClient } from '@angular/common/http';
import { Filters } from '../../../models/filters.model';
import { Router } from '@angular/router';
import { HomeService } from '../../../services/services.index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  searchs = [];


  constructor(
    // tslint:disable-next-line: variable-name
    public _homeService: HomeService,
    public http: HttpClient,
    public router: Router
  ) {

    this._homeService.loading = true;

    this.getSearchs();
   }

  ngOnInit() {
  }

  getSearchs() {
    const url = ODS_URL + '/api/records/1.0/search/?dataset=espana-municipios&rows=45';

    this.http.get(url).subscribe( (res: any) => {
      this.searchs = res.records;
      this._homeService.loading = false;
    } );
  }

  redirectToSearch( search ) {
    const filters = new Filters('');

    filters.termino = search.fields.municipio;
    filters.cmun = search.fields.cmun;

    if (filters.termino.length > 10) {
      filters.queDesea = 'alquilar';
    } else {
      filters.queDesea = 'comprar';
    }

    localStorage.removeItem('filter');
    localStorage.setItem('filter', JSON.stringify(filters));

    this.router.navigate(['/search']);

  }

}
