import { NgModule } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReminderRoutingModule } from './reminder-routing.module';

@NgModule({
    declarations: [
        FilterComponent,
        DashboardComponent,
        ListComponent
    ],
    imports: [
        SharedModule,
        ReminderRoutingModule
    ]
})
export class RemindersModule { }
