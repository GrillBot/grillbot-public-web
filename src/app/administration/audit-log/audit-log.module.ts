import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AuditLogRoutingModule } from './audit-log-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent
    ],
    imports: [
        SharedModule,
        AuditLogRoutingModule
    ]
})
export class AuditLogModule { }
