import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserDetailComponent } from './detail/user-detail/user-detail.component';
import { UserDetailGuildsComponent } from './detail/user-detail-guilds/user-detail-guilds.component';
import { UserDetailEmotesComponent } from './detail/user-detail-emotes/user-detail-emotes.component';

@NgModule({
    declarations: [
        UserDetailComponent,
        UserDetailGuildsComponent,
        UserDetailEmotesComponent
    ],
    imports: [
        SharedModule,
        UsersRoutingModule
    ]
})
export class UsersModule { }
