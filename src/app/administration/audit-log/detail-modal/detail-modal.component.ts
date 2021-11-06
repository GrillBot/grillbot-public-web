import { AuditLogItemType } from './../../../core/models/enums/audit-log-item-type';
import { Component, Input, OnInit } from '@angular/core';
import { AuditLogListItem } from 'src/app/core/models/audit-log';
import { AuditLogService } from 'src/app/core/services/audit-log.service';
import { diffLines } from 'diff';

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

    renderStringDiff(before: string, after: string): string {
        const lines = diffLines(before, after, { newlineIsToken: true, ignoreCase: true });
        const diff = lines.map(o => {
            if (o.added) { return `+ ${o.value}`; }
            else if (o.removed) { return `- ${o.value}`; }
            else { return null; }
        }).filter(o => o !== null);
        return diff.join('\n');
    }
}
