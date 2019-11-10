import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './components/pages/pages.module';

// Components
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/pages/login/login.component';

// Routes
import { APP_ROUTES } from './app.routes';

// Services
import { ServicesModule } from './services/services.module';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    APP_ROUTES,
    PagesModule,
    ServicesModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    // { provide: StorageBucket, useValue: 'my-bucket-name' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
