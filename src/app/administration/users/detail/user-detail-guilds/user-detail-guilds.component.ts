import { Component, Input } from '@angular/core';
import { GuildUserDetail } from 'src/app/core/models/users';

@Component({
    selector: 'app-user-detail-guilds',
    templateUrl: './user-detail-guilds.component.html'
})
export class UserDetailGuildsComponent {
    @Input() userGuilds: GuildUserDetail[];
}
