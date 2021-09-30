import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
    declarations: [
        AdministrationComponent,
        HeaderComponent,
        SidenavComponent
    ],
    imports: [
        SharedModule,
        AdministrationRoutingModule
    ]
})
export class AdministrationModule { }
