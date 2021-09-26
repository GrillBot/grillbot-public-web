import { QueryParam } from './../models/http';
import { APP_BASE_HREF } from '@angular/common';
import { StorageService } from './storage.service';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from './base.service';
import { AuthToken, OAuth2Link } from '../models/auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private storage: StorageService,
        private router: Router,
        @Inject(APP_BASE_HREF) private baseHref: string,
        private base: BaseService
    ) { }

    get currentToken(): AuthToken {
        return AuthToken.recreate(this.storage.read<AuthToken>('AuthData'));
    }

    get isLogged(): boolean {
        return !this.currentToken.isExpired;
    }

    logout(): void {
        this.storage.remove('AuthData');
        this.router.navigate(['/login']);
    }

    getLink(): Observable<OAuth2Link> {
        const url = `${environment.apiUrl}/auth/link`;

        return this.base.http.get<any>(url).pipe(
            map(data => OAuth2Link.create(data))
        );
    }

    processLogin(sessionId: string): Observable<AuthToken> {
        const query = new QueryParam('sessionId', sessionId);
        const url = `${environment.apiUrl}/api/auth/token?${query.toString()}`;

        return this.base.http.get<any>(url).pipe(
            map(data => AuthToken.create(data)),
        );
    }
}
