import { Dictionary, ObservableDict } from './../models/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
        private base: BaseService
    ) { }

    getChannelsOfGuild(guildId: string): ObservableDict<string, string> {
        const url = `${environment.apiUrl}/data/${guildId}/channels`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] }))),
            catchError(err => this.base.catchError(err))
        );
    }

    getRolesOfGuild(guildId: string): ObservableDict<string, string> {
        const url = `${environment.apiUrl}/data/${guildId}/roles`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] }))),
            catchError(err => this.base.catchError(err))
        );
    }
}
