import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'me', pathMatch: 'full' },
    { path: 'me', component: UserDetailComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
