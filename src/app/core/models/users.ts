import { ChannelStatItem } from './channels';
import { DateTime } from './datetime';
import { UserFlags } from './enums/user-flags';
import { UserStatus } from './enums/user-status';
import { Guild } from './guilds';
import { Invite, InviteBase } from './invites';

export class User {
    public id: string;
    public username: string;
    public discriminator: string;
    public isBot: boolean;
    public avatarUrl: string;

    get fullUsername(): string {
        return this.discriminator ? `${this.username}#${this.discriminator}` : this.username;
    }

    static create(data: any): User | null {
        if (!data) { return null; }

        const user = new User();

        user.id = data.id;
        user.isBot = data.isBot;
        user.avatarUrl = data.avatarUrl;
        user.discriminator = data.discriminator;
        user.username = data.username;

        return user;
    }
}

export class GuildUser extends User {
    public usedInvite: Invite | null;
    public points: number;
    public givenReactions: number;
    public obtainedReactions: number;
    public nickname: string | null;

    get fullname(): string {
        return !this.nickname ? this.fullUsername : `${this.nickname} (${this.fullUsername})`;
    }

    static create(data: any): GuildUser | null {
        if (!data) { return null; }
        const base = super.create(data);
        const user = new GuildUser();

        user.avatarUrl = base.avatarUrl;
        user.discriminator = base.discriminator;
        user.givenReactions = data.givenReactions;
        user.id = base.id;
        user.nickname = data.nickname;
        user.obtainedReactions = data.obtainedReactions;
        user.points = data.points;
        user.usedInvite = data.usedInvite ? Invite.create(data.usedInvite) : null;
        user.username = base.username;

        return user;
    }
}

export class UserDetail {
    public id: string;
    public username: string;
    public flags: number;
    public haveBirthday: boolean;
    public guilds: GuildUserDetail[];
    public emotes: EmoteStatItem[];
    public status: UserStatus;
    public activeClients: string[];
    public isKnown: boolean;
    public avatarUrl: string;
    public selfUnverifyMinimalTime: string | null;
    public registeredAt: DateTime | null;

    // tslint:disable: no-bitwise
    get isBotAdmin(): boolean { return (this.flags & UserFlags.BotAdmin) !== 0; }
    get isBot(): boolean { return (this.flags & UserFlags.NotUser) !== 0; }
    get isWebAdminOnline(): boolean { return (this.flags & UserFlags.WebAdminOnline) !== 0; }
    get isPublicAdminOnline(): boolean { return (this.flags & UserFlags.PublicAdminOnline) !== 0; }

    static create(data: any): UserDetail | null {
        if (!data) { return null; }
        const detail = new UserDetail();

        detail.id = data.id;
        detail.username = data.username;
        detail.flags = data.flags;
        detail.haveBirthday = data.haveBirthday ?? false;
        detail.guilds = data.guilds?.map((o: any) => GuildUserDetail.create(o)).filter((o: GuildUserDetail) => o);
        detail.emotes = data.emotes?.map((o: any) => EmoteStatItem.create(o)).filter((o: EmoteStatItem) => o);
        detail.status = data.status;
        detail.activeClients = data.activeClients?.map((o: string) => o);
        detail.isKnown = data.isKnown;
        detail.avatarUrl = data.avatarUrl;
        detail.selfUnverifyMinimalTime = data.selfUnverifyMinimalTime;
        detail.registeredAt = data.registeredAt ? DateTime.fromISOString(data.registeredAt) : null;

        return detail;
    }
}

export class GuildUserDetail {
    public guild: Guild;
    public points: number;
    public givenReactions: number;
    public obtainedReactions: number;
    public nickname: string;
    public usedInvite: Invite | null;
    public createdInvites: InviteBase[];
    public channels: ChannelStatItem[];
    public isGuildKnown: boolean;
    public isUserInGuild: boolean;

    static create(data: any): GuildUserDetail | null {
        if (!data) { return null; }
        const detail = new GuildUserDetail();

        detail.guild = Guild.create(data.guild);
        detail.points = data.points;
        detail.givenReactions = data.givenReactions;
        detail.obtainedReactions = data.obtainedReactions;
        detail.nickname = data.nickname;
        detail.usedInvite = data.usedInvite ? Invite.create(data.usedInvite) : null;
        detail.createdInvites = data.createdInvites?.map((o: any) => InviteBase.create(o)).filter((o: InviteBase) => o);
        detail.channels = data.channels?.map((o: any) => ChannelStatItem.create(o)).filter((o: ChannelStatItem) => o);
        detail.isGuildKnown = data.isGuildKnown;
        detail.isUserInGuild = data.isUserInGuild;

        return detail;
    }
}

export class EmoteStatItem {
    public name: string;
    public useCount: number;
    public imageUrl: string;
    public firstOccurence: DateTime;
    public lastOccurence: DateTime;

    static create(data: any): EmoteStatItem | null {
        if (!data) { return null; }
        const item = new EmoteStatItem();

        item.name = data.name;
        item.useCount = data.useCount;
        item.imageUrl = data.imageUrl;
        item.firstOccurence = DateTime.fromISOString(data.firstOccurence);
        item.lastOccurence = DateTime.fromISOString(data.lastOccurence);

        return item;
    }
}
