import { Component, OnInit } from '@angular/core';
import { CommandStatisticItem } from 'src/app/core/models/system';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
    selector: 'app-commands',
    templateUrl: './commands.component.html'
})
export class CommandsComponent implements OnInit {
    data: CommandStatisticItem[];

    constructor(
        private systemService: SystemService
    ) { }

    ngOnInit(): void {
        this.systemService.getCommandsStatistics().subscribe(data => this.data = data);
    }
}
