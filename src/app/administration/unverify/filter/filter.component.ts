import { Support } from './../../../core/lib/support';
import { UnverifyOperation, UnverifyOperationTexts } from './../../../core/models/enums/unverify-operation';
import { StorageService } from 'src/app/core/services/storage.service';
import { Dictionary } from './../../../core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnverifyLogParams } from 'src/app/core/models/unverify';
import { DataService } from 'src/app/core/services/data.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<UnverifyLogParams>();

    form: FormGroup;

    users: Dictionary<string, string>;
    guilds: Dictionary<string, string>;
    operations: Dictionary<number, string>;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.dataService.getGuilds().subscribe(guilds => this.guilds = guilds);
        this.dataService.getUsersList().subscribe(users => this.users = users);
        this.operations = Object.keys(UnverifyOperation).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: UnverifyOperationTexts[Support.getEnumKeyByValue(UnverifyOperation, o)] }));

        const filter = UnverifyLogParams.create(
            this.storage.read<UnverifyLogParams>('UnverifyLogParams')
        ) || UnverifyLogParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: UnverifyLogParams): void {
        this.form = this.fb.group({
            operation: [filter.operation],
            guildId: [filter.guildId],
            fromUserId: [filter.fromUserId],
            toUserId: [filter.toUserId],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = UnverifyLogParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<UnverifyLogParams>('UnverifyLogParams', filter);
    }

    reset(): void {
        this.form.patchValue(UnverifyLogParams.empty);
    }

}
