import { Dictionary } from 'src/app/core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuditLogListParams } from 'src/app/core/models/audit-log';
import { StorageService } from 'src/app/core/services/storage.service';
import { DataService } from 'src/app/core/services/data.service';
import { AuditLogItemTypeMask, AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Support } from 'src/app/core/lib/support';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<AuditLogListParams>();

    form: FormGroup;

    guilds: Dictionary<string, string>;
    users: Dictionary<string, string>;
    channels: Dictionary<string, string>;
    types: Dictionary<number, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getGuilds().subscribe(guilds => this.guilds = guilds);
        this.dataService.getUsersList().subscribe(users => this.users = users);
        this.types = Object.keys(AuditLogItemTypeMask)
            .filter(o => !isNaN(parseInt(o, 10)) && parseInt(o, 10) > 0)
            .map(o => {
                return {
                    key: parseInt(o, 10),
                    value: AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemTypeMask, parseInt(o, 10))]
                };
            });

        const filter = AuditLogListParams.create(this.storage.read<any>('AuditLogListParams')) || AuditLogListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: AuditLogListParams): void {
        const serialized = filter.serialized;

        this.form = this.fb.group({
            guild: [serialized.guild],
            channel: [serialized.channel],
            createdFrom: [serialized.createdFrom],
            createdTo: [serialized.createdTo],
            ignoreBots: [serialized.ignoreBots],
            processedUser: [serialized.processedUser],
            types: [serialized.types]
        });

        if (serialized.guild) {
            this.setChannels(serialized.guild);
        }

        this.form.get('guild').valueChanges.subscribe(guildId => {
            if (guildId) {
                this.setChannels(guildId);
            } else {
                this.channels = null;
            }
        });

        this.form.valueChanges.pipe(debounceTime(300)).subscribe(_ => this.submitForm());
    }

    setChannels(guildId: string): void {
        this.dataService.getChannelsOfGuild(guildId).subscribe(channels => this.channels = channels);
    }

    submitForm(): void {
        const filter = AuditLogListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<AuditLogListParams>('AuditLogListParams', filter.serialized);
    }

    reset(): void {
        const empty = AuditLogListParams.empty.serialized;
        this.form.patchValue(empty);
        this.submitForm();
    }
}
