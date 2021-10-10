import { UserStatus } from 'src/app/core/models/enums/user-status';
import { SystemService } from './../../../core/services/system.service';
import { DiagnosticsInfo } from './../../../core/models/system';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-diagnostics',
    templateUrl: './diagnostics.component.html'
})
export class DiagnosticsComponent implements OnInit {
    data: DiagnosticsInfo;

    get UserStatus(): typeof UserStatus { return UserStatus; }

    constructor(
        private systemService: SystemService
    ) { }

    ngOnInit(): void {
        this.refreshDiag();
    }

    refreshDiag(): void {
        this.data = null;
        this.systemService.getDiagnostics().subscribe(diag => this.data = diag);
    }

    toggleState(newState: UserStatus): void {
        this.systemService.setBotState(newState).subscribe(_ => this.refreshDiag());
    }
}
