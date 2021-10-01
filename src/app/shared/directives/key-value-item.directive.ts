import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[keyValueItem]'
})
export class KeyValueItemDirective implements OnInit {
    @Input() key: string;
    @Input() value: any;

    constructor(private element: ElementRef) { }
    ngOnInit(): void {
        this.element.nativeElement.innerHTML = `${this.key}<br><b>${this.value}</b>`;
    }
}
