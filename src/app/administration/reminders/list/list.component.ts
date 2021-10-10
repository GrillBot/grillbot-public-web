import { Component, ViewChild } from '@angular/core';
import { PaginatedParams } from 'src/app/core/models/common';
import { GetReminderListParams, RemindListSortTypes, RemindMessage } from 'src/app/core/models/reminder';
import { ReminderService } from 'src/app/core/services/reminder.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent {
    private filter: GetReminderListParams;

    sortDesc = true;
    sortBy: RemindListSortTypes = 'id';

    @ViewChild('list', { static: false }) list: DataListComponent;

    constructor(
        private reminderService: ReminderService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: GetReminderListParams): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.reminderService.getReminderList(this.filter, pagination, this.sortBy, this.sortDesc)
            .subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: RemindListSortTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }

        if (this.list) { this.list.onChange(); }
    }

    cancel(item: RemindMessage, notify: boolean): void {
        let message = `Opravdu si přeješ zrušit oznámení pro uživatele ${item.toUser?.fullUsername}? `;
        if (notify) { message += 'Uživateli přijde předčasně oznámení.'; }

        this.modalService.showQuestion('Zrušení upozornění', message).onAccept.subscribe(_ => {
            this.reminderService.cancelRemind(item.id, notify).subscribe(_ => this.list.onChange());
        });
    }

    showMessage(item: RemindMessage): void {
        this.modalService.showNotification(`Obsah notifikace #${item.id}`, item.message);
    }
}
