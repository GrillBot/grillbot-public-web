import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { DataListComponent } from './data-list/data-list.component';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { ListButtonComponent } from './list-button/list-button.component';
import { KeyValueItemDirective } from './directives/key-value-item.directive';
import { ModalComponent } from './modal/modal.component';
import { ValidationErrorsModalComponent } from './modal/validation-errors-modal/validation-errors-modal.component';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { CheckboxBitmaskComponent } from './checkbox-bitmask/checkbox-bitmask.component';
import { NgxFilesizeModule } from 'ngx-filesize';
import { CzechBooleanPipePipe } from './pipes/czech-boolean-pipe.pipe';
import { DiscordPermsPipePipe } from './pipes/discord-perms-pipe.pipe';
import { DateTimeFormatterPipe } from './pipes/date-time-formatter.pipe';
import { SortingDirective } from './data-list/sorting.directive';

@NgModule({
    declarations: [
        CardComponent,
        DataListComponent,
        LoadingComponent,
        ListButtonComponent,
        KeyValueItemDirective,
        ModalComponent,
        ValidationErrorsModalComponent,
        CommonDashboardComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        CzechBooleanPipePipe,
        DiscordPermsPipePipe,
        DateTimeFormatterPipe,
        SortingDirective
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbPaginationModule,
        RouterModule,
        NgbModalModule,
        NgxFilesizeModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CardComponent,
        DataListComponent,
        LoadingComponent,
        ListButtonComponent,
        KeyValueItemDirective,
        ModalComponent,
        ValidationErrorsModalComponent,
        CommonDashboardComponent,
        CheckboxComponent,
        CheckboxBitmaskComponent,
        NgxFilesizeModule,
        CzechBooleanPipePipe,
        DiscordPermsPipePipe,
        DateTimeFormatterPipe,
        SortingDirective
    ]
})
export class SharedModule { }
