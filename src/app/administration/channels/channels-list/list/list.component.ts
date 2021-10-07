import { Component, ViewChild } from '@angular/core';
import { ChannelListSortTypes, GetChannelListParams } from 'src/app/core/models/channels';
import { PaginatedParams } from 'src/app/core/models/common';
import { ChannelService } from 'src/app/core/services/channel.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    private filter: GetChannelListParams;

    sortDesc = false;
    sortBy: ChannelListSortTypes = 'name';

    @ViewChild('list', { static: false }) list: DataListComponent;

    constructor(
        private channelService: ChannelService
    ) { }

    filterChanged(filter: GetChannelListParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.channelService.getChannelsList(this.filter, pagination, this.sortBy, this.sortDesc)
            .subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: ChannelListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.onChange(); }
    }
}
