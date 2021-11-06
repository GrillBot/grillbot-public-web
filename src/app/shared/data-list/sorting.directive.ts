import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[sortable]'
})
export class SortingDirective implements OnInit {
    @Input() key: string;
    @Input() current: string;
    @Input() sortDesc: boolean;

    @Output() clicked = new EventEmitter<string>();

    constructor(private ref: ElementRef<HTMLElement>) { }

    @HostListener('click')
    onClick(): void {
        this.clicked.emit(this.key);
        this.setSortIcon();
    }

    ngOnInit(): void {
        this.ref.nativeElement.classList.add('sortable');
        this.setSortIcon();
    }

    setSortIcon(): void {
        if (this.current !== this.key) { return; }

        if (this.sortDesc) {
            this.ref.nativeElement.classList.add('sort-desc');
        } else {
            this.ref.nativeElement.classList.add('sort-asc');
        }
    }
}
