import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { HTTPHeaders } from '../models/http';
import { AuthToken } from '../models/auth';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(
        public router: Router,
        public storage: StorageService,
        public http: HttpClient
    ) { }

    catchErr(err: HttpErrorResponse): Observable<unknown> {
        // TODO: Modal

        if (!this.isAuthError(err)) {
            return throwError(err);
        }

        if (err.error instanceof ErrorEvent) {
            console.error(`Došlo k chybě na straně klienta`, err.error);
            return throwError(err);
        }

        return EMPTY;
    }

    isAuthError(err: HttpErrorResponse): boolean {
        if (err.status === HttpStatusCode.Unauthorized) {
            this.storage.remove('AuthData');
            this.router.navigate(['/login']);
            return true;
        }

        return false;
    }

    getHttpHeaders(): HTTPHeaders {
        const auth = AuthToken.create(this.storage.read<any>('AuthData'));

        return {
            Authorization: `Bearer ${auth.accessToken}`
        };
    }
}
