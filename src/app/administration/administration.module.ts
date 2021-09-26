import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration/administration.component';

@NgModule({
    declarations: [
        AdministrationComponent
    ],
    imports: [
        SharedModule,
        AdministrationRoutingModule
    ]
})
export class AdministrationModule { }
