import { Component, Input } from '@angular/core';
import { GuildUserDetail } from 'src/app/core/models/users';

@Component({
    selector: 'app-user-detail-guilds',
    templateUrl: './user-detail-guilds.component.html',
    styleUrls: ['./user-detail-guilds.component.scss']
})
export class UserDetailGuildsComponent {
    @Input() userGuilds: GuildUserDetail[];

    invisibleSections: string[] = [];

    getSectionName(section: string, index: number): string {
        return `${index}#${section}`;
    }

    isVisible(section: string, index: number): boolean {
        return !this.invisibleSections.includes(this.getSectionName(section, index));
    }

    toggleVisibility(section: string, index: number): void {
        const name = this.getSectionName(section, index);

        if (this.isVisible(section, index)) {
            this.invisibleSections.push(name);
        } else {
            this.invisibleSections = this.invisibleSections.filter(o => o !== name);
        }
    }

    visibilityText(section: string, index: number): string {
        return this.isVisible(section, index) ? 'Skrýt' : 'Zobrazit';
    }
}
