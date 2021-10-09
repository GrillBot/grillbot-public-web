import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GetExplicitPermissionListParams } from 'src/app/core/models/permissions';
import { StorageService } from 'src/app/core/services/storage.service';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {
    @Output() filterChanged = new EventEmitter<GetExplicitPermissionListParams>();

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private storage: StorageService
    ) { }

    ngOnInit(): void {
        const filter = GetExplicitPermissionListParams.create(
            this.storage.read<GetExplicitPermissionListParams>('ExplicitPermissionListParams')
        ) || GetExplicitPermissionListParams.empty;

        this.initFilter(filter);
        this.submitForm();
    }

    private initFilter(filter: GetExplicitPermissionListParams): void {
        this.form = this.fb.group({
            searchQuery: [filter.searchQuery]
        });

        this.form.valueChanges.pipe(debounceTime(500)).subscribe(_ => this.submitForm());
    }

    submitForm(): void {
        const filter = GetExplicitPermissionListParams.create(this.form.value);

        this.filterChanged.emit(filter);
        this.storage.store<GetExplicitPermissionListParams>('ExplicitPermissionListParams', filter);
    }

    reset(): void {
        this.form.patchValue(GetExplicitPermissionListParams.empty);
    }

}
