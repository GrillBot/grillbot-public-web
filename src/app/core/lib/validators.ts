import { AbstractControl } from '@angular/forms';

export class ValidationHelper {
    static isInvalid(form: AbstractControl, controlId: string, errorId: string = null): boolean {
        const control = form.get(controlId);
        if (!control.touched) { return false; }

        return errorId ? control.hasError(errorId) : control.invalid;
    }
}
