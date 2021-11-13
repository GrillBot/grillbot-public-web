import { Dictionary } from 'src/app/core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuditLogListParams } from 'src/app/core/models/audit-log';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuditLogItemType, AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Support } from 'src/app/core/lib/support';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<AuditLogListParams>();

    form: FormGroup;
    types: Dictionary<number, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    get guildId(): string { return this.form.get('guild').value as string; }

    ngOnInit(): void {
        this.types = Object.keys(AuditLogItemType)
            .filter(o => !isNaN(parseInt(o, 10)) && parseInt(o, 10) > 0)
            .map(o => ({
                key: parseInt(o, 10),
                value: AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, parseInt(o, 10))] as string
            }));

        const filter = AuditLogListParams.create(this.storage.read<any>('AuditLogListParams')) || AuditLogListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        const filter = AuditLogListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.storage.store<AuditLogListParams>('AuditLogListParams', filter.serialized);
    }

    cleanFilter(): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.form.patchValue(AuditLogListParams.empty.serialized);
    }

    private initFilter(filter: AuditLogListParams): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const serialized = filter.serialized;

        /* eslint-disable @typescript-eslint/no-unsafe-member-access */
        this.form = this.fb.group({
            guild: [serialized.guild],
            channel: [serialized.channel],
            createdFrom: [serialized.createdFrom],
            createdTo: [serialized.createdTo],
            ignoreBots: [serialized.ignoreBots],
            processedUsers: [serialized.processedUsers],
            types: [serialized.types]
        });

        this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.submitForm());
    }
}
