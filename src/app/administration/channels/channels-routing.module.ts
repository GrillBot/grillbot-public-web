import { ChannelDetailComponent } from './channel-detail/channel-detail.component';
import { DashboardComponent } from './channels-list/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: ChannelDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChannelsRoutingModule { }
