import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import * as Guid from 'guid';

export class ValidationHelper {
    static isGuid(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            const value: string = control.value;
            return value && Guid.isGuid(value) ? null : { guid: true };
        };
    }
}
