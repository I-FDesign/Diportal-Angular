import { Component, OnInit } from '@angular/core';
import { Filters } from '../../../models/filters.model';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ContactModalService } from '../../../services/contact-modal.service';

declare function slideUpDropdown();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faSignInAlt = faSignInAlt;

  constructor(
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _contactModalService: ContactModalService
  ) { }

  ngOnInit() {
  }

  redirectTo( type: string ) {

    if ( type === 'login' ) {
      slideUpDropdown();
      this.router.navigate(['/login']);

      return;
    }

    const filter = new Filters('', false, type);

    localStorage.removeItem('filter');
    localStorage.setItem('filter', JSON.stringify( filter ));

    this.router.navigate(['/search']);

    slideUpDropdown();

  }

  openModal( ) {
    this._contactModalService.openModal('empresa');
  }


}
