import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuildDetailComponent } from './guild-detail/guild-detail.component';
import { DashboardComponent } from './guild-list/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: GuildDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GuildsRoutingModule { }
