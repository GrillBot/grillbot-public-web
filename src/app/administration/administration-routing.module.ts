import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { AuthGuard } from '../core/services/auth.guard';
import { AdministrationComponent } from './administration/administration.component';

const routes: Routes = [
    {
        path: '',
        component: AdministrationComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'servers', pathMatch: 'full' },
            {
                path: 'servers',
                loadChildren: () => import('./guilds/guilds.module').then(mod => mod.GuildsModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./users/users.module').then(mod => mod.UsersModule)
            },
            {
                path: 'audit-log',
                loadChildren: () => import('./audit-log/audit-log.module').then(mod => mod.AuditLogModule)
            },
            {
                path: 'channels',
                loadChildren: () => import('./channels/channels.module').then(mod => mod.ChannelsModule)
            },
            {
                path: 'invites',
                loadChildren: () => import('./invites/invites.module').then(mod => mod.InvitesModule)
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrationRoutingModule { }
