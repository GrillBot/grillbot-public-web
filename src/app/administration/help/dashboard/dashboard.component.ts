import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { CommandGroup } from 'src/app/core/models/help';
import { ObservableList } from 'src/app/core/models/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    groups: ObservableList<CommandGroup>;

    constructor(
        private usersService: UserService
    ) { }

    ngOnInit(): void {
        this.groups = this.usersService.getAvailableCommands();
    }

}
