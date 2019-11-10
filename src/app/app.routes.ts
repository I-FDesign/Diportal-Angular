import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { LoginSecurityGuard } from './guards/login-security.guard';
import { RecoverPasswordComponent } from './components/pages/login/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/pages/login/reset-password/reset-password.component';


const routes: Routes = [
    { path: 'login',
      canActivate: [ LoginSecurityGuard ],
      component: LoginComponent
    },
    { path: 'login/contraseña',
      canActivate: [ LoginSecurityGuard ],
      component: RecoverPasswordComponent
    },
    { path: 'login/contraseña/:token',
      canActivate: [ LoginSecurityGuard ],
      component: ResetPasswordComponent
    },
    { path: '**', component: PageNotFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );



