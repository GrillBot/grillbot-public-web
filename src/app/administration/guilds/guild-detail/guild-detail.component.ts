import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Dictionary } from 'src/app/core/models/common';
import { GuildDetail, UpdateGuildParams } from 'src/app/core/models/guilds';
import { DataService } from 'src/app/core/services/data.service';
import { GuildService } from 'src/app/core/services/guild.service';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-guild-detail',
    templateUrl: './guild-detail.component.html',
    styleUrls: ['./guild-detail.component.scss']
})
export class GuildDetailComponent implements OnInit {
    data: GuildDetail;
    form: FormGroup;

    roles: Dictionary<string, string>;
    channels: Dictionary<string, string>;

    constructor(
        private guildService: GuildService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private fb: FormBuilder,
        private modal: ModalService
    ) { }

    ngOnInit(): void {
        const guildId: string = this.activatedRoute.snapshot.params.id.toString();

        this.dataService.getRoles(guildId).subscribe(roles => this.roles = roles);
        this.dataService.getChannelsOfGuild(guildId).subscribe(channels => this.channels = channels);
        this.guildService.getGuildDetail(guildId).subscribe(detail => {
            this.data = detail;

            this.form = this.fb.group({
                mutedRole: [this.data.mutedRole?.id ?? null],
                adminChannel: [this.data.adminChannel?.id ?? null]
            });
        });
    }

    submitSettings(): void {
        const params = new UpdateGuildParams(
            this.form.value.mutedRole,
            this.form.value.adminChannel
        );

        this.guildService.updateGuild(this.data.id, params).subscribe(_ => {
            this.modal.showNotification('Změna nastavení serveru', 'Nastavení serveru bylo úspěšně provedeno.');
        });
    }

}
