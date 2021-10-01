import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
})
export class ModalComponent {
    @Input() title: string;
    @Input() text = '';
    @Input() isQuestion = false;

    constructor(public modal: NgbActiveModal) { }
}
