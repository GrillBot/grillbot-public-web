import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './users-list/dashboard/dashboard.component';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: ':id', component: UserDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
