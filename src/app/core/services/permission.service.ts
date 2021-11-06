import { HttpErrorResponse } from '@angular/common/http';
import { ExplicitPermissionState } from './../models/enums/explicit-permission-state';
import { QueryParam } from './../models/http';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateExplicitPermissionParams, ExplicitPermission, GetExplicitPermissionListParams } from '../models/permissions';
import { BaseService } from './base.service';
import { ObservableList } from '../models/common';

@Injectable({ providedIn: 'root' })
export class PermissionService {
    constructor(
        private base: BaseService
    ) { }

    createExplicitPermission(params: CreateExplicitPermissionParams): Observable<unknown> {
        const url = `${environment.apiUrl}/permissions/explicit`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, params, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    removeExplicitPermission(command: string, targetId: string): Observable<unknown> {
        const parameters = [
            new QueryParam('command', command),
            new QueryParam('targetId', targetId)
        ].map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/permissions/explicit?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    getExplicitPermissionList(params: GetExplicitPermissionListParams): ObservableList<ExplicitPermission> {
        const parameters = params.queryParams.filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/permissions/explicit?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<ExplicitPermission[]>(url, { headers }).pipe(
            map(data => data.map(o => ExplicitPermission.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    setPermissionState(command: string, targetId: string, state: ExplicitPermissionState): Observable<unknown> {
        const parameters = [
            new QueryParam('command', command),
            new QueryParam('targetId', targetId),
            new QueryParam('state', state)
        ].map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/permissions/set?${parameters}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.put(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
