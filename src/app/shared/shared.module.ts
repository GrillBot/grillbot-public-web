import { CommonPageModule } from './common-page/common-page.module';
import { ListButtonComponent } from './list-button/list-button.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './card/card.component';
import { DataListComponent } from './data-list/data-list.component';
import { NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingComponent } from './loading/loading.component';
import { KeyValueItemDirective } from './directives/key-value-item.directive';
import { ModalComponent } from './modal/modal.component';
import { ValidationErrorsModalComponent } from './modal/validation-errors-modal/validation-errors-modal.component';
import { SortingDirective } from './data-list/sorting.directive';
import { SearchInputComponent } from './search-input/search-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CzechBooleanPipePipe } from './pipes/czech-boolean-pipe.pipe';
import { CheckboxComponent } from './checkbox/checkbox.component';

@NgModule({
    declarations: [
        CardComponent,
        DataListComponent,
        LoadingComponent,
        KeyValueItemDirective,
        ModalComponent,
        ValidationErrorsModalComponent,
        SortingDirective,
        SearchInputComponent,
        ListButtonComponent,
        CzechBooleanPipePipe,
        CheckboxComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbPaginationModule,
        RouterModule,
        NgbModalModule,
        NgSelectModule,
        CommonPageModule
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        CardComponent,
        DataListComponent,
        LoadingComponent,
        KeyValueItemDirective,
        ModalComponent,
        ValidationErrorsModalComponent,
        SortingDirective,
        SearchInputComponent,
        NgSelectModule,
        ListButtonComponent,
        CzechBooleanPipePipe,
        CheckboxComponent,
        CommonPageModule
    ]
})
export class SharedModule { }
