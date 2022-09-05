import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { HTTPHeaders, QueryParam } from '../models/http';
import { AuthToken } from '../models/auth';
import { ModalService, ValidationErrorsModalComponent } from 'src/app/shared/modal';
import { Support } from '../lib/support';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(
        public router: Router,
        public storage: StorageService,
        public http: HttpClient,
        private modal: ModalService
    ) { }

    catchError(err: HttpErrorResponse, suppressModal: boolean = false): Observable<never> {
        if (err.status === HttpStatusCode.BadRequest && err.error?.errors) {
            const modal = this.modal.showCustomModal<ValidationErrorsModalComponent>(ValidationErrorsModalComponent, 'lg');
            modal.componentInstance.errors = Support.flattern<string>(Object.values(err.error.errors) as string[]) as string[];
            return EMPTY;
        } else if (err.status === HttpStatusCode.Unauthorized) {
            this.storage.remove('GrillBot_Public_AuthData');
            this.router.navigate(['/', 'login']).then().catch();
            return EMPTY;
        } else if (err.status !== HttpStatusCode.Ok) {
            let message = 'Při vykonání požadavku došlo k neočekávané chybě.<br>';

            if (err.status > 0) {
                if (err.error.message) {
                    message += `<p>${err.error.message}</p>`;
                } else if (err.error.errors) {
                    message += `<ul class="mt-3">${err.error.errors.map(o => '<li>' + o + '</li>').join('')}</ul>`;
                }
            } else {
                message += `<p>${err.message}</p>`;
            }

            if (!suppressModal) {
                this.modal.showNotification('Chyba požadavku', message, 'lg');
            }
        }

        return throwError(err);
    }

    isAuthError(err: HttpErrorResponse): boolean {
        if (err.status === HttpStatusCode.Unauthorized) {
            this.storage.remove('GrillBot_Public_AuthData');
            this.router.navigate(['/login']);
            return true;
        }

        return false;
    }

    getHttpHeaders(): HTTPHeaders {
        const auth = AuthToken.create(this.storage.read<any>('GrillBot_Public_AuthData'));

        return { Authorization: `Bearer ${auth.accessToken}` };
    }

    createUrl(endpoint: string, queryParams: QueryParam[] = null): string {
        let url = environment.apiUrl + `/${endpoint}`;
        if (queryParams && queryParams.length > 0) {
            const parameters = queryParams.map(o => o.toString()).join('&');
            url += `?${parameters}`;
        }

        return url;
    }
}
