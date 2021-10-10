import { Dictionary } from './../../../core/models/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetSearchingListParams } from 'src/app/core/models/searching';
import { DataService } from 'src/app/core/services/data.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetSearchingListParams>();

    form: FormGroup;

    users: Dictionary<string, string>;
    guilds: Dictionary<string, string>;
    channels: Dictionary<string, string>;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.dataService.getUsersList().subscribe(users => this.users = users);
        this.dataService.getGuilds().subscribe(guilds => this.guilds = guilds);

        const filter = GetSearchingListParams.create(
            this.storage.read<GetSearchingListParams>('SearchingListParams')
        ) || GetSearchingListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GetSearchingListParams): void {
        this.form = this.fb.group({
            guildId: [filter.guildId],
            channelId: [filter.channelId],
            userId: [filter.userId]
        });

        if (filter.channelId) {
            this.setChannels(filter.channelId);
        }

        this.form.get('guildId').valueChanges.subscribe(guildId => {
            if (guildId) {
                this.setChannels(guildId);
            } else {
                this.channels = null;
            }
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }

    private setChannels(guildId: string): void {
        this.dataService.getChannelsOfGuild(guildId).subscribe(channels => this.channels = channels);
    }

    submitForm(): void {
        const filter = GetSearchingListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetSearchingListParams>('SearchingListParams', filter);
    }

    reset(): void {
        this.form.patchValue(GetSearchingListParams.empty);
    }
}
