import { OnDestroy, OnInit, Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-administration',
    templateUrl: './administration.component.html'
})
export class AdministrationComponent implements OnInit, OnDestroy {
    private hearthbeatInterval: number;

    constructor(
        private userService: UserService
    ) { }

    ngOnInit(): void {
        document.body.classList.add('sb-nav-fixed');

        this.userService.hearthbeat().subscribe();
        this.hearthbeatInterval = window.setInterval(() => {
            this.userService.hearthbeat().subscribe();
        }, environment.hearthbeat);
    }

    ngOnDestroy(): void {
        document.body.classList.remove('sb-nav-fixed');
        clearInterval(this.hearthbeatInterval);
    }
}
