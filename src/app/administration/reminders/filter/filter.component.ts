import { Dictionary } from './../../../core/models/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetReminderListParams } from 'src/app/core/models/reminder';
import { StorageService } from 'src/app/core/services/storage.service';
import { DataService } from 'src/app/core/services/data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetReminderListParams>();

    form: FormGroup;

    users: Dictionary<string, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dataService.getUsersList().subscribe(users => this.users = users);

        const filter = GetReminderListParams.create(
            this.storage.read<GetReminderListParams>('ReminderListParams')
        ) || GetReminderListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GetReminderListParams): void {
        this.form = this.fb.group({
            fromUserId: [filter.fromUserId],
            toUserId: [filter.toUserId],
            originalMessageId: [filter.originalMessageId],
            messageContains: [filter.messageContains],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = GetReminderListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetReminderListParams>('ReminderListParams', filter);
    }

    reset(): void {
        this.form.patchValue(GetReminderListParams.empty);
    }
}
