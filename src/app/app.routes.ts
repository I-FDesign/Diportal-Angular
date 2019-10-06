import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/pages/login/login.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );



