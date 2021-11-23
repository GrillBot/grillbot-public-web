import { Support } from './../../../core/lib/support';
import { UnverifyOperation, UnverifyOperationTexts } from './../../../core/models/enums/unverify-operation';
import { StorageService } from 'src/app/core/services/storage.service';
import { Dictionary } from './../../../core/models/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnverifyLogParams } from 'src/app/core/models/unverify';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<UnverifyLogParams>();
    form: FormGroup;
    operations: Dictionary<string, string>;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        this.operations = Object.keys(UnverifyOperation).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o.toString(), value: UnverifyOperationTexts[Support.getEnumKeyByValue(UnverifyOperation, o)] as string }));

        const filter = UnverifyLogParams.create(
            this.storage.read<UnverifyLogParams>('UnverifyLogParams')
        ) || UnverifyLogParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    submitForm(): void {
        const filter = UnverifyLogParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<UnverifyLogParams>('UnverifyLogParams', filter);
    }

    reset(): void {
        this.form.patchValue(UnverifyLogParams.empty);
    }

    private initFilter(filter: UnverifyLogParams): void {
        this.form = this.fb.group({
            operation: [filter.operation],
            guildId: [filter.guildId],
            createdFrom: [filter.createdFrom],
            createdTo: [filter.createdTo]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }
}
