import { QueryParam } from './../models/http';
import { Dictionary, ObservableDict, ObservableList } from './../models/common';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(
        private base: BaseService
    ) { }

    getGuilds(): ObservableDict<string, string> {
        const url = `${environment.apiUrl}/data/guilds`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] }))),
            catchError(err => this.base.catchError(err))
        );
    }

    getChannelsOfGuild(guildId: string): ObservableDict<string, string> {
        const url = `${environment.apiUrl}/data/${guildId}/channels`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] }))),
            catchError(err => this.base.catchError(err))
        );
    }

    getRoles(guildId?: string): ObservableDict<string, string> {
        const parameter = [guildId ? new QueryParam('guildId', guildId) : null].filter(o => o).map(o => o.toString()).join('&');
        const url = `${environment.apiUrl}/data/roles?${parameter}`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] }))),
            catchError(err => this.base.catchError(err))
        );
    }

    getCommands(): ObservableList<string> {
        const url = `${environment.apiUrl}/data/commands`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<string[]>(url, { headers }).pipe(
            map(data => data.map(o => o)),
            catchError(err => this.base.catchError(err))
        );
    }

    getUsersList(): ObservableDict<string, string> {
        const url = `${environment.apiUrl}/data/users`;
        const headers = this.base.getHttpHeaders();

        return this.base.http.get<Dictionary<string, string>>(url, { headers }).pipe(
            map(data => Object.keys(data).map(k => ({ key: k, value: data[k] }))),
            catchError(err => this.base.catchError(err))
        );
    }
}
