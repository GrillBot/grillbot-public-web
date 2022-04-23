import { SearchingListItem } from './../../../core/models/searching';
import { Component, ViewChild } from '@angular/core';
import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { GetSearchingListParams, SearchingListSortTypes } from 'src/app/core/models/searching';
import { SearchingService } from 'src/app/core/services/searching.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { SearchingDetailComponent } from '../searching-detail/searching-detail.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;

    sort: SortParams = { orderBy: 'Id', descending: true };
    private filter: GetSearchingListParams;

    constructor(
        private searchingService: SearchingService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetSearchingListParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        if (!this.filter) { return; }

        this.filter.set(pagination, this.sort);
        this.searchingService.getSearchList(this.filter).subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: SearchingListSortTypes): void {
        if (this.sort.orderBy !== sortBy) {
            this.sort.orderBy = sortBy;
        } else {
            this.sort.descending = !this.sort.descending;
        }

        if (this.list) { this.list.onChange(); }
    }

    showMessage(item: SearchingListItem, event: Event): void {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        const modal = this.modalService.showCustomModal<SearchingDetailComponent>(SearchingDetailComponent, 'xl');
        modal.componentInstance.item = item;
    }
}
