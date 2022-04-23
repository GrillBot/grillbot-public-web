import { PaginatedParams, Dictionary, SortParams } from './../../../core/models/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { UnverifyListSortTypes, UnverifyLogParams } from 'src/app/core/models/unverify';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { DataService } from 'src/app/core/services/data.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { orderBy: 'Id', descending: true };
    channels: Dictionary<string, string>;

    private filter: UnverifyLogParams | null = null;

    constructor(
        private unverifyService: UnverifyService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getChannels().subscribe(channels => this.channels = channels);
    }

    filterChanged(filter: UnverifyLogParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);

        this.unverifyService.getUnverifyLog(this.filter).subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: UnverifyListSortTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.onChange(); }
    }

    resolveChannelName(id: string): string | null {
        if (!this.channels) { return ''; }
        return this.channels.find(o => o.key === id)?.value ?? '';
    }
}
