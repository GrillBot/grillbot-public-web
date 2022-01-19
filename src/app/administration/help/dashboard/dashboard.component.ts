import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { CommandGroup } from 'src/app/core/models/help';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    commands: CommandGroup[];

    constructor(
        private usersService: UserService
    ) { }

    ngOnInit(): void {
        this.usersService.getAvailableCommands().subscribe(commands => this.commands = commands);
    }

}
