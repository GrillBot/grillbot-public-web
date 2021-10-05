import { Support } from './../../../../core/lib/support';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserFlags } from 'src/app/core/models/enums/user-flags';
import { StatusColorMapping, UserStatus, UserStatusTexts } from 'src/app/core/models/enums/user-status';
import { UserDetail } from 'src/app/core/models/users';
import { UserService } from 'src/app/core/services/user.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
    data: UserDetail;
    form: FormGroup;

    get statusColor(): string { return StatusColorMapping[Support.getEnumKeyByValue(UserStatus, this.data.status)]; }
    get statusText(): string { return UserStatusTexts[Support.getEnumKeyByValue(UserStatus, this.data.status)]; }

    constructor(
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private modal: ModalService
    ) { }

    ngOnInit(): void {
        const userId: string = this.activatedRoute.snapshot.params.id.toString();

        this.userService.getUserDetail(userId).subscribe(detail => {
            this.data = detail;

            this.form = this.fb.group({
                apiToken: [''],
                // tslint:disable-next-line: no-bitwise
                botAdmin: [(detail.flags & UserFlags.BotAdmin) !== 0],
                note: [detail.note]
            });
        });
    }

    onUserUpdated(detail: UserDetail): void {
        this.data = detail;
    }
}
