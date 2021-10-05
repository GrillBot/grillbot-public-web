import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UpdateUserParams, UserDetail } from 'src/app/core/models/users';
import * as Guid from 'guid';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-user-detail-settings',
    templateUrl: './user-detail-settings.component.html'
})
export class UserDetailSettingsComponent implements OnInit {
    @Input() user: UserDetail;
    @Output() userUpdated = new EventEmitter<UserDetail>();

    form: FormGroup;

    get isCurrentUser(): boolean { return this.authService.currentToken.jwt.id === this.user.id; }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private userService: UserService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.form = this.fb.group({
            apiToken: [this.user.apiToken, ValidationHelper.isGuid()],
            botAdmin: [this.user.isBotAdmin],
            note: [this.user.note]
        });

        if (this.isCurrentUser || this.user.isBot) {
            this.form.get('botAdmin').disable();
        }
    }

    createNewGuid(): void {
        const guid: any = Guid.create();
        this.form.get('apiToken').setValue(guid.value);
    }

    submitForm(): void {
        const params = new UpdateUserParams(
            this.form.value.apiToken.length === 0 ? null : this.form.value.apiToken,
            this.isCurrentUser ? this.user.isBotAdmin : this.form.value.botAdmin,
            this.form.value.note
        );

        this.userService.updateUser(this.user.id, params).subscribe(detail => {
            this.modalService.showNotification('Nastavení uživatele', 'Nastavení uživatele byla úspěšně změněna.');
            this.userUpdated.emit(detail);
        });
    }
}
