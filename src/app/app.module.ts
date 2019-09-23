import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { SearchComponent } from './components/pages/search/search.component';

// Routes
import { APP_ROUTES } from './app.routes';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';

// Services
import { ServicesModule } from './services/services.module';
import { LoadingComponent } from './components/shared/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    PageNotFoundComponent,
    SearchComponent,
    ClickStopPropagationDirective,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    APP_ROUTES,
    ServicesModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
