import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageUploadModule } from 'angular2-image-upload';

// Components
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';


// Directives
import { ClickStopPropagationDirective } from '../../directives/click-stop-propagation.directive';
import { UploadFileComponent } from './upload-file/upload-file.component';


import { AnuncioMapComponent } from './anuncio-map/anuncio-map.component';
import { FormsModule } from '@angular/forms';
import { PostImagesPipe } from '../../pipes/post-images.pipe';
import { OptionPipe } from 'src/app/pipes/option.pipe';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    ClickStopPropagationDirective,
    UploadFileComponent,
    AnuncioMapComponent,
    PostImagesPipe,
    OptionPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FontAwesomeModule,
    ImageUploadModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoadingComponent,
    UploadFileComponent,
    AnuncioMapComponent,
    PostImagesPipe,
    OptionPipe
  ]
})
export class SharedModule { }
