import { PaginatedResponse } from './../models/common';
import { AuditLogFileMetadata, AuditLogListItem, SortingTypes } from './../models/audit-log';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AuditLogListParams } from '../models/audit-log';
import { PaginatedParams } from '../models/common';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { QueryParam } from '../models/http';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class AuditLogService {
    constructor(
        private base: BaseService
    ) { }

    removeItem(id: number): Observable<unknown> {
        const url = `${environment.apiUrl}/auditlog/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError(err => this.base.catchError(err))
        );
    }

    getAuditLogData(id: number): Observable<any> {
        const url = `${environment.apiUrl}/auditlog/${id}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<any>(url, { headers }).pipe(
            catchError(err => this.base.catchError(err))
        );
    }

    getAuditLogList(filter: AuditLogListParams, pagination: PaginatedParams, sortDesc: boolean, sortBy: SortingTypes)
        : Observable<PaginatedResponse<AuditLogListItem>> {
        const parameters = [
            ...filter.queryParams,
            ...pagination.queryParams,
            new QueryParam('sortDesc', sortDesc),
            new QueryParam('sortBy', sortBy)
        ].filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/auditlog?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<PaginatedResponse<AuditLogListItem>>(url, { headers }).pipe(
            map(data => PaginatedResponse.create(data, entity => AuditLogListItem.create(entity))),
            catchError(err => this.base.catchError(err))
        );
    }

    downloadFile(id: number, file: AuditLogFileMetadata): void {
        const url = `${environment.apiUrl}/auditlog/${id}/${file.id}`;
        const headers = this.base.getHttpHeaders();
        (headers as any).responseType = 'blob';

        this.base.http.get(url, { headers, responseType: 'blob', observe: 'response' }).subscribe(resource => {
            const body = resource.body;
            saveAs(body, file.filename);
        });
    }
}