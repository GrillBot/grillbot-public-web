import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDetail } from '../models/users';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ObservableList } from '../models/common';
import { CommandGroup } from '../models/help';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private base: BaseService
    ) { }

    getUserDetail(): Observable<UserDetail> {
        const url = `${environment.apiUrl}/users/me`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<UserDetail>(url, { headers }).pipe(
            map(data => UserDetail.create(data)),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }

    hearthbeat(): Observable<unknown> {
        const url = `${environment.apiUrl}/users/hearthbeat?isPublic=true`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.post(url, null, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err, true))
        );
    }

    hearthbeatOff(): Observable<unknown> {
        const url = `${environment.apiUrl}/users/hearthbeat?isPublic=true`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.delete(url, { headers }).pipe(
            catchError((err: HttpErrorResponse) => this.base.catchError(err, true))
        );
    }

    getAvailableCommands(): ObservableList<CommandGroup> {
        const url = `${environment.apiUrl}/users/me/commands`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<CommandGroup[]>(url, { headers }).pipe(
            map(data => data.map(o => CommandGroup.create(o))),
            catchError((err: HttpErrorResponse) => this.base.catchError(err))
        );
    }
}
