import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PAGES_ROUTES } from './pages.routes';
import { ServicesModule } from '../../services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


// Components
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ContactModalComponent } from '../shared/contact-modal/contact-modal.component';
import { PostComponent } from '../shared/post/post.component';
import { SearchInputComponent } from '../shared/search-input/search-input.component';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { PostViewComponent } from './post-view/post-view.component';
import { PostTypePipe } from 'src/app/pipes/post-type.pipe';
import { MapSearchComponent } from './map-search/map-search.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { RecoverPasswordComponent } from './login/recover-password/recover-password.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';




@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    SearchComponent,
    ContactModalComponent,
    PostComponent,
    SearchInputComponent,
    AdminComponent,
    AnuncioComponent,
    PostViewComponent,
    PostTypePipe,
    MapSearchComponent,
    AnunciosComponent,
    RecoverPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PAGES_ROUTES,
    ServicesModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  exports: [
    HomeComponent,
    SearchComponent
  ]
})
export class PagesModule { }
