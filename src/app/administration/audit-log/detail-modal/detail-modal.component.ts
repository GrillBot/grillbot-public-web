import { AuditLogItemType } from './../../../core/models/enums/audit-log-item-type';
import { Component, Input, OnInit } from '@angular/core';
import { AuditLogListItem } from 'src/app/core/models/audit-log';
import { AuditLogService } from 'src/app/core/services/audit-log.service';

@Component({
    selector: 'app-detail-modal',
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.scss']
})
export class DetailModalComponent implements OnInit {
    @Input() item: AuditLogListItem;

    data: any;

    get isTextView(): boolean {
        return [AuditLogItemType.Info, AuditLogItemType.Error, AuditLogItemType.Warning].includes(this.item.type);
    }

    get isDiff(): boolean {
        return [
            AuditLogItemType.ChannelUpdated,
            AuditLogItemType.OverwriteUpdated,
            AuditLogItemType.MemberUpdated,
            AuditLogItemType.MemberRoleUpdated,
            AuditLogItemType.GuildUpdated
        ].includes(this.item.type);
    }

    get AuditLogItemType(): typeof AuditLogItemType { return AuditLogItemType; }

    constructor(
        private auditLogService: AuditLogService
    ) { }

    ngOnInit(): void {
        this.auditLogService.getAuditLogData(this.item.id).subscribe(data => this.data = data);
    }

}
