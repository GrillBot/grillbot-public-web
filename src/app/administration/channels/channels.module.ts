import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChannelsRoutingModule } from './channels-routing.module';
import { DashboardComponent } from './channels-list/dashboard/dashboard.component';
import { ListComponent } from './channels-list/list/list.component';
import { FilterComponent } from './channels-list/filter/filter.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        ChannelDetailComponent
    ],
    imports: [
        SharedModule,
        ChannelsRoutingModule
    ]
})
export class ChannelsModule { }
