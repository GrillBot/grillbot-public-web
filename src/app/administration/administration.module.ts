import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/services/auth.guard';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule),
                data: { title: 'Můj účet' }
            },
            {
                path: 'channels',
                loadChildren: () => import('./channels/channels.module').then(mod => mod.ChannelsModule),
                data: { title: 'Kanály' }
            },
            {
                path: 'unverify',
                loadChildren: () => import('./unverify/unverify.module').then(mod => mod.UnverifyModule),
                data: { title: 'Unverify' }
            },
            {
                path: 'help',
                loadChildren: () => import('./help/help.module').then(mod => mod.HelpModule),
                data: { title: 'Nápověda' }
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    declarations: [
        AdministrationComponent,
        HeaderComponent,
        SidenavComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdministrationModule { }
