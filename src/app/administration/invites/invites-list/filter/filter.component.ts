import { Dictionary } from './../../../../core/models/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetInviteListParams } from 'src/app/core/models/invites';
import { StorageService } from 'src/app/core/services/storage.service';
import { DataService } from 'src/app/core/services/data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetInviteListParams>();

    form: FormGroup;

    guilds: Dictionary<string, string>;
    users: Dictionary<string, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getGuilds().subscribe(guilds => this.guilds = guilds);
        this.dataService.getUsersList().subscribe(users => this.users = users);

        const filter = GetInviteListParams.create(this.storage.read<GetInviteListParams>('InviteListParams')) ||
            GetInviteListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GetInviteListParams): void {
        this.form = this.fb.group({
            code: [filter.code],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo],
            creatorId: [filter.creatorId],
            guildId: [filter.guildId]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = GetInviteListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetInviteListParams>('InviteListParams', filter);
    }

    reset(): void {
        const filter = GetInviteListParams.empty;

        this.form.patchValue({
            code: filter.code,
            createdFrom: filter.createdFrom,
            createdTo: filter.createdTo,
            creatorId: filter.creatorId,
            guildId: filter.guildId
        });
    }
}
