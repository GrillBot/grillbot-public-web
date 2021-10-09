import { Component, ViewChild } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetInviteListParams, InviteListSortTypes } from 'src/app/core/models/invites';
import { InviteService } from 'src/app/core/services/invite.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    private filter: GetInviteListParams;

    sortDesc = true;
    sortBy: InviteListSortTypes = 'createdAt';

    @ViewChild('list', { static: false }) list: DataListComponent;

    constructor(
        private inviteService: InviteService
    ) { }

    filterChanged(filter: GetInviteListParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.inviteService.getInviteList(this.filter, pagination, this.sortDesc, this.sortBy)
            .subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: InviteListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.onChange(); }
    }
}
