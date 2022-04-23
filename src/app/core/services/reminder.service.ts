import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../models/common';
import { GetReminderListParams, RemindMessage } from '../models/reminder';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class ReminderService {
    constructor(
        private base: BaseService
    ) { }

    getReminderList(params: GetReminderListParams): Observable<PaginatedResponse<RemindMessage>> {
        const parameters = params.queryParams.map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/remind?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<RemindMessage>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => RemindMessage.create(entity))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
