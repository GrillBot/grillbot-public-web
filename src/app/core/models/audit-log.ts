import { Support } from 'src/app/core/lib/support';
import { AuditLogItemTypeTexts } from 'src/app/core/models/enums/audit-log-item-type';
import { Channel } from './channels';
import { DateTime } from './datetime';
import { AuditLogItemType } from './enums/audit-log-item-type';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { GuildUser } from './users';

export class AuditLogListParams {
    public guildId: string | null;
    public processedUserIds: string[] = [];
    public types: AuditLogItemType[] = [];
    public createdFrom: string | null;
    public createdTo: string | null;
    public ignoreBots: boolean;
    public channelId: string | null;

    static get empty(): AuditLogListParams { return new AuditLogListParams(); }

    get queryParams(): QueryParam[] {
        return [
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            ...(this.processedUserIds ? this.processedUserIds.map(o => new QueryParam('processedUserIds', o)) : []),
            ...(this.types && this.types.length > 0 ? this.types.map(o => new QueryParam('types', o)) : []),
            this.createdFrom ? new QueryParam('createdFrom', this.createdFrom) : null,
            this.createdTo ? new QueryParam('createdTo', this.createdTo) : null,
            new QueryParam('ignoreBots', this.ignoreBots),
            this.channelId ? new QueryParam('channelId', this.channelId) : null
        ].filter(o => o);
    }

    get serialized(): any {
        return {
            guild: this.guildId,
            channel: this.channelId,
            createdFrom: this.createdFrom,
            createdTo: this.createdTo,
            ignoreBots: this.ignoreBots ?? false,
            processedUsers: this.processedUserIds,
            types: this.types
        };
    }

    static create(form: any): AuditLogListParams | null {
        if (!form) { return null; }
        const params = new AuditLogListParams();

        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        params.guildId = form.guild;
        params.channelId = form.channel;
        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.ignoreBots = form.ignoreBots ?? false;
        params.processedUserIds = form.processedUsers;
        params.types = form.types;

        return params;
    }
}

export class AuditLogListItem {
    public id: number;
    public createdAt: DateTime;
    public guild: Guild | null;
    public processedUser: GuildUser;
    public discordAuditLogItemId: string | null;
    public type: AuditLogItemType;
    public channel: Channel | null;
    public files: AuditLogFileMetadata[];
    public containsData: boolean;

    get title(): string {
        return AuditLogItemTypeTexts[Support.getEnumKeyByValue(AuditLogItemType, this.type)] as string;
    }

    static create(data: any): AuditLogListItem | null {
        if (!data) { return null; }
        const item = new AuditLogListItem();

        item.channel = data.channel ? Channel.create(data.channel) : null;
        item.containsData = data.containsData;
        item.createdAt = DateTime.fromISOString(data.createdAt);
        item.discordAuditLogItemId = data.discordAuditLogItemId;
        item.files = data.files.map((o: any) => AuditLogFileMetadata.create(o)).filter((o: AuditLogFileMetadata) => o);
        item.guild = data.guild ? Guild.create(data.guild) : null;
        item.id = data.id;
        item.processedUser = data.processedUser ? GuildUser.create(data.processedUser) : null;
        item.type = data.type;

        return item;
    }
}

export class AuditLogFileMetadata {
    public id: number;
    public filename: string;
    public size: number;

    static create(data: any): AuditLogFileMetadata | null {
        if (!data) { return null; }
        const metadata = new AuditLogFileMetadata();

        metadata.id = data.id;
        metadata.size = data.size;
        metadata.filename = data.filename;

        return metadata;
    }
}

export type SortingTypes = 'guild' | 'processed' | 'type' | 'channel' | 'createdat';

