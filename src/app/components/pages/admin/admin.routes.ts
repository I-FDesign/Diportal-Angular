import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { MessagesComponent } from './messages/messages.component';
import { ImportComponent } from './import/import.component';


const AdminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            { path: 'usuarios', component: UsersComponent },
            { path: 'mensajes', component: MessagesComponent },
            { path: 'importar', component: ImportComponent },
            { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
        ]
    }
];

export const ADMIN_ROUTES = RouterModule.forChild( AdminRoutes );

