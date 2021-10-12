import { UpdateUnverifyTimeModalComponent } from './../update-unverify-time-modal/update-unverify-time-modal.component';
import { Dictionary } from './../../../core/models/common';
import { UnverifyUserProfile } from './../../../core/models/unverify';
import { Component, OnInit } from '@angular/core';
import { UnverifyService } from 'src/app/core/services/unverify.service';
import { DataService } from 'src/app/core/services/data.service';
import { forkJoin } from 'rxjs';
import { ModalService } from 'src/app/shared/modal';

@Component({
    selector: 'app-current-state',
    templateUrl: './current-state.component.html',
    styleUrls: ['./current-state.component.scss']
})
export class CurrentStateComponent implements OnInit {
    profiles: UnverifyUserProfile[];

    channels: Dictionary<string, string>;

    constructor(
        private unverifyService: UnverifyService,
        private dataService: DataService,
        private modalService: ModalService
    ) { }

    ngOnInit(): void {
        this.reloadData();
    }

    reloadData(): void {
        this.profiles = null;

        forkJoin({
            unverify: this.unverifyService.getCurrentUnverifies(),
            channels: this.dataService.getChannels()
        }).subscribe(data => {
            this.channels = data.channels;
            this.profiles = data.unverify;
        });
    }

    resolveChannelName(id: string): string {
        if (!this.channels) { return ''; }
        return this.channels.find(o => o.key === id)?.value ?? '';
    }

    showReason(profile: UnverifyUserProfile): void {
        this.modalService.showNotification('Důvod odebrání přístupu', profile.reason);
    }

    removeUnverify(profile: UnverifyUserProfile): void {
        this.modalService.showQuestion('Vrácení přístupu', 'Opravdu si přejete vrátit přístup?').onAccept.subscribe(_ => {
            this.unverifyService.removeUnverify(profile.guild.id, profile.user.id).subscribe(_ => this.reloadData());
        });
    }

    openTimeUpdate(profile: UnverifyUserProfile): void {
        const modal = this.modalService.showCustomModal<UpdateUnverifyTimeModalComponent>(UpdateUnverifyTimeModalComponent);

        modal.componentInstance.profile = profile;
        modal.onAccept.subscribe(_ => {
            const newEnd = modal.componentInstance.end;
            this.unverifyService.updateUnverifyTime(profile.guild.id, profile.user.id, newEnd).subscribe(result => {
                this.modalService.showNotification('Změna času odebrání přístupu', result.replace(/\*\*/g, ''))
                    .onClose.subscribe(___ => this.reloadData());
            });
        });
    }
}
