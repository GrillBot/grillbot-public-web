import { SearchingListItem } from './../../../core/models/searching';
import { Component, ViewChild } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetSearchingListParams, SearchingListSortTypes } from 'src/app/core/models/searching';
import { SearchingService } from 'src/app/core/services/searching.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';
import { CardComponent } from 'src/app/shared/card/card.component';
import { SearchingDetailComponent } from '../searching-detail/searching-detail.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    @ViewChild('list', { static: false }) list: DataListComponent;
    @ViewChild('card', { static: false }) card: CardComponent;

    sortDesc = true;
    sortBy: SearchingListSortTypes = 'id';

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
        this.searchingService.getSearchList(this.filter, pagination, this.sortBy, this.sortDesc)
            .subscribe(list => this.list.setData(list, this.card));
    }

    setSort(sortBy: SearchingListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
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
