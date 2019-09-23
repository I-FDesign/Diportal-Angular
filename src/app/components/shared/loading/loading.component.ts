import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/services.index';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    public _homeService: HomeService
  ) { }

  ngOnInit() {
  }

}
