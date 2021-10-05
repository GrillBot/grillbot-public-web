import { DataListComponent } from './../../../../shared/data-list/data-list.component';
import { Component, ViewChild } from '@angular/core';
import { GetUserListParams } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/services/user.service';
import { PaginatedParams } from 'src/app/core/models/common';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    private filter: GetUserListParams;
    sortDesc = false;

    @ViewChild('list', { static: false }) list: DataListComponent;

    constructor(
        private userService: UserService
    ) { }

    filterChanged(filter: GetUserListParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.userService.getUsersList(this.filter, pagination, this.sortDesc).subscribe(list => this.list.setData(list));
    }

    toggleSort(): void {
        this.sortDesc = !this.sortDesc;
        this.list.onChange();
    }
}