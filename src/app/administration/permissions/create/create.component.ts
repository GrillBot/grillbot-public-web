import { Router } from '@angular/router';
import { ExplicitPermissionStateTexts } from './../../../core/models/enums/explicit-permission-state';
import { Dictionary } from './../../../core/models/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { PermissionService } from 'src/app/core/services/permission.service';
import { ExplicitPermissionState } from 'src/app/core/models/enums/explicit-permission-state';
import { Support } from 'src/app/core/lib/support';
import { CreateExplicitPermissionParams } from 'src/app/core/models/permissions';
import { ValidationHelper } from 'src/app/core/lib/validators';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit {
    form: FormGroup;

    commands: string[];
    users: Dictionary<string, string>;
    roles: Dictionary<string, string>;
    states: Dictionary<number, string>;

    get isRole(): boolean { return this.form.get('isRole')?.value ?? false; }

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private permissionService: PermissionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.dataService.getCommands().subscribe(commands => this.commands = commands);
        this.dataService.getUsersList().subscribe(users => this.users = users);
        this.dataService.getRoles().subscribe(roles => this.roles = roles);
        this.states = Object.keys(ExplicitPermissionState).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: ExplicitPermissionStateTexts[Support.getEnumKeyByValue(ExplicitPermissionState, o)] }));

        this.form = this.fb.group({
            command: [null, Validators.required],
            isRole: [false],
            role: [null],
            user: [null],
            state: [this.states[0].key]
        });

        this.form.get('isRole').valueChanges.subscribe(_ => this.setValidators());
        this.setValidators();
    }

    private setValidators(): void {
        if (this.isRole) {
            this.form.get('role').addValidators([Validators.required]);
            this.form.get('user').clearValidators();
        } else {
            this.form.get('user').addValidators([Validators.required]);
            this.form.get('role').clearValidators();
        }
    }

    submitForm(): void {
        const params = CreateExplicitPermissionParams.create(this.form.value);

        this.permissionService.createExplicitPermission(params).subscribe(_ => {
            this.router.navigateByUrl('/admin/permissions');
        });
    }

    hasError(controlId: string, errorId: string = null): boolean {
        return ValidationHelper.isInvalid(this.form, controlId, errorId);
    }
}
