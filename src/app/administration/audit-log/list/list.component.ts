import { Component, ViewChild } from '@angular/core';
import { AuditLogListParams, SortingTypes } from 'src/app/core/models/audit-log';
import { PaginatedParams } from 'src/app/core/models/common';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent {
    private filter: AuditLogListParams;

    sortDesc = true;
    sortBy: SortingTypes = 'createdat';

    @ViewChild('list', { static: false }) list: DataListComponent;

    constructor(
        private auditLogService: AuditLogService,
        private modalService: ModalService
    ) { }

    filterChanged(filter: any): void {
        this.filter = filter;
        if (this.list) { this.list.onChange(); }
    }

    readData(pagination: PaginatedParams): void {
        this.auditLogService.getAuditLogList(this.filter, pagination, this.sortDesc, this.sortBy)
            .subscribe(list => this.list.setData(list));
    }

    setSort(sortBy: SortingTypes): void {
        if (this.sortBy !== sortBy) {
            this.sortBy = sortBy;
        } else {
            this.sortDesc = !this.sortDesc;
        }
        if (this.list) { this.list.onChange(); }
    }

    removeItem(id: number): void {
        this.modalService.showQuestion('Smazání záznamu z logu', 'Opravdu si přeješ smazat záznam z logu? Tato akce je nevratná!')
            .onAccept.subscribe(_ => this.auditLogService.removeItem(id).subscribe(_ => this.list.onChange()));
    }
}
