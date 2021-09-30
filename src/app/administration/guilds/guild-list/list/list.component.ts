import { GuildListFilter } from './../../../../core/models/guilds';
import { Component, ViewChild } from '@angular/core';
import { GuildService } from 'src/app/core/services/guild.service';
import { PaginatedParams } from 'src/app/core/models/common';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    private filter: GuildListFilter;

    @ViewChild('list', { static: false }) list: DataListComponent;

    constructor(
        private guildService: GuildService
    ) { }

    filterChanged(filter: GuildListFilter): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.guildService.getGuildList(this.filter, pagination).subscribe(response => this.list.setData(response));
    }
}
