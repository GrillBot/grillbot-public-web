import { Dictionary } from './../../../../core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { GetUserListParams } from 'src/app/core/models/users';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Support } from 'src/app/core/lib/support';
import { UserFilterFlags, UserFilterFlagsTexts } from 'src/app/core/models/enums/user-filter-flags';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetUserListParams>();

    form: FormGroup;
    guilds: Dictionary<string, string>;
    flagsMask: Dictionary<number, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getGuilds().subscribe(guilds => this.guilds = guilds);
        this.flagsMask = Object.keys(UserFilterFlags)
            .filter(o => !isNaN(parseInt(o, 10)) && parseInt(o, 10) > 0)
            .map(o => ({ key: parseInt(o, 10), value: UserFilterFlagsTexts[Support.getEnumKeyByValue(UserFilterFlags, parseInt(o, 10))] }));

        const filter = GetUserListParams.create(this.storage.read<GetUserListParams>('UserListFilter')) || GetUserListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GetUserListParams): void {
        this.form = this.fb.group({
            username: [filter.username],
            guild: [filter.guildId],
            flags: [filter.flags],
        });

        this.form.valueChanges.pipe(debounceTime(600)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = GetUserListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetUserListParams>('UserListFilter', filter.serialize());
    }

    reset(): void {
        const filter = GetUserListParams.empty;

        this.form.patchValue({
            username: filter.username,
            guild: filter.guildId,
            flags: filter.flags
        });
    }
}
