import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { UrlSerializer } from '@angular/router';
import { CaseInsensitiveUrlSerializer } from './core/lib/case-insensitve-url-serializer';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useFactory: (platformLocation: PlatformLocation) => platformLocation.getBaseHrefFromDOM(),
            deps: [PlatformLocation]
        },
        {
            provide: UrlSerializer,
            useClass: CaseInsensitiveUrlSerializer
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
