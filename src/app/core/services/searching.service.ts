import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedParams, PaginatedResponse } from '../models/common';
import { GetSearchingListParams, SearchingListItem, SearchingListSortTypes } from '../models/searching';
import { BaseService } from './base.service';
import { QueryParam } from '../models/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SearchingService {
    constructor(
        private base: BaseService
    ) { }

    getSearchList(filter: GetSearchingListParams, pagination: PaginatedParams, sortBy: SearchingListSortTypes, sortDesc: boolean)
        : Observable<PaginatedResponse<SearchingListItem>> {
        const parameters = [
            ...filter.queryParams,
            ...pagination.queryParams,
            new QueryParam('sortBy', sortBy),
            new QueryParam('sortDesc', sortDesc)
        ].filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/search?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<SearchingListItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => SearchingListItem.create(entity))),
            catchError(err => this.base.catchError(err))
        );
    }

    removeSearches(ids: number[]): Observable<unknown> {
        const parameters = ids.map(o => new QueryParam('id', o)).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/search?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError(err => this.base.catchError(err))
        );
    }
}
