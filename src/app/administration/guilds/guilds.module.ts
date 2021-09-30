import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { GuildsRoutingModule } from './guilds-routing.module';
import { DashboardComponent } from './guild-list/dashboard/dashboard.component';
import { FilterComponent } from './guild-list/filter/filter.component';
import { ListComponent } from './guild-list/list/list.component';

@NgModule({
    declarations: [
    
    DashboardComponent,
         FilterComponent,
         ListComponent
  ],
    imports: [
        SharedModule,
        GuildsRoutingModule
    ]
})
export class GuildsModule { }
