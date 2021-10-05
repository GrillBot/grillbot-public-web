import { Component, Input } from '@angular/core';
import { EmoteStatItem } from 'src/app/core/models/users';

@Component({
    selector: 'app-user-detail-emotes',
    templateUrl: './user-detail-emotes.component.html',
    styleUrls: ['./user-detail-emotes.component.scss']
})
export class UserDetailEmotesComponent {
    @Input() emotes: EmoteStatItem[];
}
