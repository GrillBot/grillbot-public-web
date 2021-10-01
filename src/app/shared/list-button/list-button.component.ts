import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'list-button',
    templateUrl: './list-button.component.html',
    styleUrls: ['./list-button.component.scss']
})
export class ListButtonComponent {
    @Input() link?: string;
    @Input() title?: string;
    @Input() iconGroup = 'fas';
    @Input() icon?: string;
    @Input() classList: string[] = [];

    @Output() clicked = new EventEmitter<unknown>();
}