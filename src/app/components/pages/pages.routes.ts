import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './admin/admin.component';
import { AnuncioComponent } from './anuncio/anuncio.component';
import { PostViewComponent } from './post-view/post-view.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { IsLoggedGuard } from '../../guards/is-logged.guard';



const PagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'search/:type', component: SearchComponent },
            { path: 'search', component: SearchComponent },
            { path: 'admin', component: AdminComponent },
            { 
                path: 'anuncio',
                canActivate: [IsLoggedGuard],
                component: AnuncioComponent
            },
            { path: 'post/:id', component: PostViewComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( PagesRoutes );

