import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { InvitesRoutingModule } from './invites-routing.module';
import { DashboardComponent } from './invites-list/dashboard/dashboard.component';
import { ListComponent } from './invites-list/list/list.component';
import { FilterComponent } from './invites-list/filter/filter.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent
    ],
    imports: [
        SharedModule,
        InvitesRoutingModule
    ]
})
export class InvitesModule { }
