import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UnverifyUserProfile } from 'src/app/core/models/unverify';

@Component({
    selector: 'app-update-unverify-time-modal',
    templateUrl: './update-unverify-time-modal.component.html'
})
export class UpdateUnverifyTimeModalComponent implements OnInit {
    @Input() profile: UnverifyUserProfile;

    form: FormGroup;
    get end(): string | null { return this.form?.get('end')?.value; }

    constructor(private fb: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            end: [null]
        });
    }
}
