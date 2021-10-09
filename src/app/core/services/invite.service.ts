import { PaginatedParams, PaginatedResponse } from './../models/common';
import { Injectable } from '@angular/core';
import { GetInviteListParams, GuildInvite, InviteListSortTypes } from '../models/invites';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QueryParam } from '../models/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InviteService {
    constructor(
        private base: BaseService
    ) { }

    getInviteList(params: GetInviteListParams, pagination: PaginatedParams, sortDesc: boolean, sortBy: InviteListSortTypes)
        : Observable<PaginatedResponse<GuildInvite>> {
        const parameters = [
            ...params.queryParams,
            ...pagination.queryParams,
            new QueryParam('sortDesc', sortDesc),
            new QueryParam('sortBy', sortBy)
        ].filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/invite?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<GuildInvite>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => GuildInvite.create(entity))),
            catchError(err => this.base.catchError(err))
        );
    }
}
