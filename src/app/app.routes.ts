import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { IsLoggedGuard } from './guards/is-logged.guard';


const routes: Routes = [
    { path: 'login',
      canActivate: [ IsLoggedGuard ],
      component: LoginComponent
    },
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );



