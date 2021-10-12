import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UnverifyRoutingModule } from './unverify-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { CurrentStateComponent } from './current-state/current-state.component';
import { UpdateUnverifyTimeModalComponent } from './update-unverify-time-modal/update-unverify-time-modal.component';

@NgModule({
    declarations: [
        DashboardComponent,
        FilterComponent,
        ListComponent,
        CurrentStateComponent,
        UpdateUnverifyTimeModalComponent
    ],
    imports: [
        SharedModule,
        UnverifyRoutingModule
    ]
})
export class UnverifyModule { }
