import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiagnosticsComponent } from './diagnostics/diagnostics.component';
import { CommandsComponent } from './commands/commands.component';
import { DatabaseComponent } from './database/database.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { InternalRoutingModule } from './internal-routing.module';

@NgModule({
    declarations: [
        DashboardComponent,
        DiagnosticsComponent,
        CommandsComponent,
        DatabaseComponent
    ],
    imports: [
        SharedModule,
        InternalRoutingModule
    ]
})
export class InternalModule { }
