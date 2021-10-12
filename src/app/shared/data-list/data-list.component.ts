import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatedParams, PaginatedResponse } from 'src/app/core/models/common';
import { defaultPageSize, pageSizes } from './models';

@Component({
    selector: 'app-data-list',
    templateUrl: './data-list.component.html',
    styleUrls: ['./data-list.component.scss']
})
export class DataListComponent implements OnInit {
    @Output() readData = new EventEmitter<any>();

    isDataLoaded = false;
    totalItemsCount = 0;
    items: any[] = [];

    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    get limit(): number { return parseInt(this.form?.get('limit')?.value ?? defaultPageSize, 10); }
    get pageSizes(): number[] { return pageSizes; }

    currentPage = 1;
    pageSize: number;

    ngOnInit(): void {
        this.form = this.fb.group({
            limit: [defaultPageSize, Validators.compose([
                Validators.min(pageSizes.reduce((prev, curr) => Math.min(prev, curr), Number.MAX_VALUE)),
                Validators.max(pageSizes.reduce((prev, curr) => Math.max(prev, curr), Number.MIN_VALUE))
            ])]
        });

        this.form.valueChanges.subscribe(() => this.onChange());
        this.onChange();
    }

    onChange(): void {
        const limit = this.limit;
        this.pageSize = limit;
        this.isDataLoaded = false;

        const paginationParams = PaginatedParams.create({ page: this.currentPage, pageSize: limit });
        this.readData.emit(paginationParams);
    }

    setData(result: PaginatedResponse<any>): void {
        this.items = result.data;
        this.currentPage = result.page;
        this.totalItemsCount = result.totalItemsCount === 0 ? 1 : result.totalItemsCount;

        this.isDataLoaded = true;
    }

    pageChange(_: number): void {
        this.onChange();
    }
}
