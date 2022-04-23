import { Observable } from 'rxjs';
import { QueryParam } from './http';

export class PaginatedParams {
    public page: number;
    public pageSize: number;

    get queryParams(): QueryParam[] {
        return [
            new QueryParam('page', this.page),
            new QueryParam('pageSize', this.pageSize)
        ];
    }

    static create(form: any): PaginatedParams | null {
        if (!form) { return null; }
        const item = new PaginatedParams();

        item.page = form.page;
        item.pageSize = form.pageSize;

        return item;
    }
}

export class PaginatedResponse<TData> {
    public data: TData[];
    public page: number;
    public totalItemsCount: number;
    public canNext: boolean;
    public canPrev: boolean;

    static create<TData>(data: any, converter: (item: any) => TData): PaginatedResponse<TData> {
        const response = new PaginatedResponse<TData>();

        response.canNext = data.canNext;
        response.canPrev = data.canPrev;
        response.data = data.data.map((o: any) => converter(o));
        response.page = data.page;
        response.totalItemsCount = data.totalItemsCount;

        return response;
    }
}

export interface KeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

export type Dictionary<TKey, TValue> = KeyValuePair<TKey, TValue>[];
export type ObservableDict<TKey, TValue> = Observable<Dictionary<TKey, TValue>>;
export type ObservableList<TItem> = Observable<TItem[]>;

export interface RangeParams<T> {
    from?: T;
    to?: T;
}

export interface SortParams {
    orderBy?: string;
    descending?: boolean;
}

export class FilterBase {
    public pagination: PaginatedParams;
    public sort: SortParams;

    get queryParams(): QueryParam[] {
        const result = [];

        if (this.sort) {
            result.push(
                new QueryParam('sort.orderBy', this.sort.orderBy),
                new QueryParam('sort.descending', this.sort.descending)
            );
        }

        if (this.pagination) {
            result.push(
                new QueryParam('pagination.page', this.pagination.page),
                new QueryParam('pagination.pageSize', this.pagination.pageSize)
            );
        }

        return result;
    }

    set(pagination: PaginatedParams, sort: SortParams) {
        this.pagination = pagination;
        this.sort = sort;
    }
}
