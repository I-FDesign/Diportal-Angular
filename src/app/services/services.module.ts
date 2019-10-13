import { NgModule } from '@angular/core';
import { HomeService } from './home.service';
import { ContactModalService } from './contact-modal.service';
import { SearchInputService } from './search-input.service';
import { AuthenticationService } from './authentication.service';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    HomeService,
    ContactModalService,
    SearchInputService,
    AuthenticationService
  ]
})
export class ServicesModule { }
