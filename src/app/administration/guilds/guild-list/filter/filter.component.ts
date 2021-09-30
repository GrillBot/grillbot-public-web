import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { GuildListFilter } from 'src/app/core/models/guilds';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GuildListFilter>();

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const filter = GuildListFilter.create(this.storage.read<GuildListFilter>('GuildListFilter') || GuildListFilter.empty);

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GuildListFilter): void {
        this.form = this.fb.group({
            nameQuery: [filter.nameQuery]
        });

        this.form.valueChanges.pipe(debounceTime(600)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = GuildListFilter.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GuildListFilter>('GuildListFilter', filter);
    }

    reset(): void {
        this.form.patchValue({
            nameQuery: GuildListFilter.empty.nameQuery
        });

        this.submitForm();
    }
}
