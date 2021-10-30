import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
    selector: 'app-time-span-input',
    templateUrl: './time-span-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TimeSpanInputComponent),
            multi: true
        }
    ]
})
export class TimeSpanInputComponent implements OnInit, ControlValueAccessor {
    private parseRegex = new RegExp('(\\d+)?\\.?(\\d\\d):(60|([0-5][0-9])):(60|([0-5][0-9]))');

    private onChange: (value: string) => void = noop;

    form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            days: [null, Validators.min(0)],
            hours: [null, Validators.compose([Validators.min(0), Validators.max(23)])],
            minutes: [null, Validators.compose([Validators.min(0), Validators.max(59)])],
            seconds: [null, Validators.compose([Validators.min(0), Validators.max(59)])]
        });

        this.form.valueChanges.subscribe(value => {
            const days = !value.days ? '' : `${value.days}.`;
            const hours = value.hours < 10 ? '0' + (value.hours == null ? '0' : value.hours) : value.hours;
            const minutes = value.minutes < 10 ? '0' + (value.minutes == null ? '0' : value.minutes) : value.minutes;
            const seconds = value.seconds < 10 ? '0' + (value.seconds == null ? '0' : value.seconds) : value.seconds;

            this.onChange(`${days}${hours}:${minutes}:${seconds}`);
        });
    }

    writeValue(obj: string): void {
        const matched = obj.match(this.parseRegex);

        if (obj.includes('.')) {
            this.form.get('days').setValue(parseInt(matched[1], 10));
            this.form.get('hours').setValue(parseInt(matched[2], 10));
            this.form.get('minutes').setValue(parseInt(matched[3], 10));
            this.form.get('seconds').setValue(parseInt(matched[4], 10));
        } else {
            this.form.get('hours').setValue(parseInt(matched[1], 10));
            this.form.get('minutes').setValue(parseInt(matched[2], 10));
            this.form.get('seconds').setValue(parseInt(matched[3], 10));
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(_: any): void { noop(); }

    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.form.disable();
        } else {
            this.form.enable();
        }
    }

}
