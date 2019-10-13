import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Components
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

// Directives
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';
import { UploadFileComponent } from './upload-file/upload-file.component';

import { ImageUploadModule } from 'angular2-image-upload';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    ClickStopPropagationDirective,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    ImageUploadModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    UploadFileComponent
  ]
})
export class SharedModule { }
