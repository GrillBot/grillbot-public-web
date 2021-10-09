import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { CreateComponent } from './create/create.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PermissionsRoutingModule } from './permissions-routing.module';

@NgModule({
    declarations: [
        DashboardComponent,
        ListComponent,
        FilterComponent,
        CreateComponent
    ],
    imports: [
        SharedModule,
        PermissionsRoutingModule
    ]
})
export class PermissionsModule { }
