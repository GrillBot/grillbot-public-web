import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchingRoutingModule } from './searching-routing.module';

@NgModule({
    declarations: [
        ListComponent,
        FilterComponent,
        DashboardComponent
    ],
    imports: [
        SharedModule,
        SearchingRoutingModule
    ]
})
export class SearchingModule { }
