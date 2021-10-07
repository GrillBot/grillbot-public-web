import { SendMessageToChannelParams } from './../../../core/models/channels';
import { GuildChannelFlags, GuildChannelFlagsTexts } from './../../../core/models/enums/guild-channel-flags';
import { Dictionary, PaginatedParams } from 'src/app/core/models/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChannelDetail, UpdateChannelParams } from 'src/app/core/models/channels';
import { DataService } from 'src/app/core/services/data.service';
import { ModalService } from 'src/app/shared/modal';
import { ChannelService } from 'src/app/core/services/channel.service';
import { Support } from 'src/app/core/lib/support';
import { ValidationHelper } from 'src/app/core/lib/validators';
import { DataListComponent } from 'src/app/shared/data-list/data-list.component';

@Component({
    selector: 'app-channel-detail',
    templateUrl: './channel-detail.component.html',
    styleUrls: ['./channel-detail.component.scss']
})
export class ChannelDetailComponent implements OnInit {
    data: ChannelDetail;
    channelId: string;

    form: FormGroup;
    sendMessageForm: FormGroup;
    channelFlags: Dictionary<number, string>;

    @ViewChild('channelStats', { static: false }) channelStats: DataListComponent;

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private modal: ModalService,
        private channelService: ChannelService
    ) { }

    ngOnInit(): void {
        this.channelId = this.activatedRoute.snapshot.params.id.toString();
        this.channelFlags = Object.keys(GuildChannelFlags).map(o => parseInt(o, 10)).filter(o => !isNaN(o))
            .map(o => ({ key: o, value: GuildChannelFlagsTexts[Support.getEnumKeyByValue(GuildChannelFlags, o)] }));

        this.channelService.getChannelDetail(this.channelId).subscribe(detail => {
            this.data = detail;

            this.form = this.fb.group({
                flags: [detail.flags]
            });
        });

        this.sendMessageForm = this.fb.group({
            content: ['', Validators.compose([Validators.required, Validators.maxLength(2000)])],
            reference: []
        });
    }

    submitSettings(): void {
        const params = new UpdateChannelParams(this.form.value.flags);

        this.channelService.updateChannel(this.channelId, params).subscribe(_ => {
            this.modal.showNotification('Změna nastavení kanálu', 'Nastavení kanálu byla úspěšně změněna.');
        });
    }

    hasError(controlId: string, errorId: string = null): boolean {
        return ValidationHelper.isInvalid(this.sendMessageForm, controlId, errorId);
    }

    sendMessageSubmit(): void {
        const params = SendMessageToChannelParams.create(this.sendMessageForm.value);

        this.channelService.sendMessageToChannel(this.data.guild.id, this.channelId, params)
            .subscribe(_ => this.modal.showNotification('Odeslání zprávy do kanálu', 'Zpráva byla úspěšně odeslána.'));
    }

    cleanCache(): void {
        this.modal.showQuestion('Vyčištění cache', 'Opravdu si přeješ vymazat cache? Některé funkce bota pak nemusí v kanálu fungovat správně (např.: logger).')
            .onAccept.subscribe(_ => {
                this.channelService.removeMessagesFromCache(this.data.guild.id, this.channelId).subscribe(__ => {
                    this.modal.showNotification('Vyčištění cache', 'Cache byla úspěšně vyčištěna.');
                });
            });
    }

    readChannelStats(pagination: PaginatedParams): void {
        this.channelService.getUserStatsOfChannel(this.channelId, pagination)
            .subscribe(stats => this.channelStats.setData(stats));
    }
}
