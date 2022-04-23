import { HttpErrorResponse } from '@angular/common/http';
import { UnverifyLogParams, UnverifyListSortTypes, UnverifyLogItem } from './../models/unverify';
import { catchError, map } from 'rxjs/operators';
import { ObservableList, PaginatedParams, PaginatedResponse } from './../models/common';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { UnverifyUserProfile } from '../models/unverify';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

/* eslint-disable @typescript-eslint/indent */
@Injectable({ providedIn: 'root' })
export class UnverifyService {
    constructor(
        private base: BaseService
    ) { }

    getCurrentUnverifies(): ObservableList<UnverifyUserProfile> {
        const url = `${environment.apiUrl}/unverify/current`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UnverifyUserProfile[]>(url, { headers }).pipe(
            map(data => data.map(o => UnverifyUserProfile.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getUnverifyLog(filter: UnverifyLogParams, pagination: PaginatedParams, sortBy: UnverifyListSortTypes,
        sortDesc: boolean): Observable<PaginatedResponse<UnverifyLogItem>> {
        const parameters = filter
            .setPagination(pagination)
            .setSort({ descending: sortDesc, orderBy: sortBy })
            .queryParams
            .map(o => o.toString())
            .join('&');

        const url = `${environment.apiUrl}/unverify/log?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<UnverifyLogItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => UnverifyLogItem.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
