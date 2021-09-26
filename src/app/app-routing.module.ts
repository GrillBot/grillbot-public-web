import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'admin',
        pathMatch: 'full'
    },
    {
        path: 'admin',
        loadChildren: () => import('./administration/administration.module').then(mod => mod.AdministrationModule)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
