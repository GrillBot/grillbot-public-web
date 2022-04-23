import { PaginatedParams, SortParams } from 'src/app/core/models/common';
import { UnverifyOperation, UnverifyOperationTexts } from './enums/unverify-operation';
import { DateTime } from './datetime';
import { Role } from './roles';
import { GuildUser, User } from './users';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { Support } from '../lib/support';

export class UnverifyUserProfile {
    public user: User;
    public start: DateTime;
    public end: DateTime;
    public endTo: string;
    public rolesToRemove: Role[];
    public rolesToKeep: Role[];
    public channelsToKeep: string[];
    public channelsToRemove: string[];
    public reason: string | null;
    public isSelfUnverify: boolean;
    public guild: Guild;

    static create(data: any): UnverifyUserProfile | null {
        if (!data) { return null; }
        const profile = new UnverifyUserProfile();

        profile.user = User.create(data.user);
        profile.start = DateTime.fromISOString(data.start);
        profile.end = DateTime.fromISOString(data.end);
        profile.endTo = data.endTo;
        profile.rolesToKeep = data.rolesToKeep.map((o: any) => Role.create(o));
        profile.rolesToRemove = data.rolesToRemove.map((o: any) => Role.create(o));
        profile.channelsToKeep = data.channelsToKeep.map((o: any) => o as string);
        profile.channelsToRemove = data.channelsToRemove.map((o: any) => o as string);
        profile.reason = data.reason;
        profile.isSelfUnverify = data.isSelfUnverify;
        profile.guild = Guild.create(data.guild);

        return profile;
    }
}

export class UnverifyLogItem {
    public id: number;
    public operation: UnverifyOperation;
    public guild: Guild;
    public fromUser: GuildUser;
    public createdAt: DateTime;
    public removeData: UnverifyLogRemove | null;
    public setData: UnverifyLogSet | null;
    public updateData: UnverifyLogUpdate | null;

    get formattedOperation(): string {
        return UnverifyOperationTexts[Support.getEnumKeyByValue(UnverifyOperation, this.operation)];
    }

    get anyData(): boolean {
        return !!this.removeData || !!this.setData || !!this.updateData;
    }

    get isUnverify(): boolean {
        return this.operation === UnverifyOperation.Unverify || this.operation === UnverifyOperation.Selfunverify;
    }

    static create(data: any): UnverifyLogItem | null {
        if (!data) { return null; }
        const item = new UnverifyLogItem();

        item.createdAt = DateTime.fromISOString(data.createdAt);
        item.fromUser = GuildUser.create(data.fromUser);
        item.guild = Guild.create(data.guild);
        item.id = data.id;
        item.operation = data.operation;
        item.removeData = data.removeData ? UnverifyLogRemove.create(data.removeData) : null;
        item.setData = data.setData ? UnverifyLogSet.create(data.setData) : null;
        item.updateData = data.updateData ? UnverifyLogUpdate.create(data.updateData) : null;

        return item;
    }
}

export class UnverifyLogRemove {
    public returnedRoles: Role[];
    public returnedChannels: string[];

    static create(data: any): UnverifyLogRemove | null {
        if (!data) { return null; }
        const item = new UnverifyLogRemove();

        item.returnedChannels = data.returnedChannelIds.map((o: any) => o as string);
        item.returnedRoles = data.returnedRoles.map((o: any) => Role.create(o));

        return item;
    }
}

export class UnverifyLogSet {
    public start: DateTime;
    public end: DateTime;
    public rolesToKeep: Role[];
    public rolesToRemove: Role[];
    public channelsToKeep: string[];
    public channelsToRemove: string[];
    public reason: string | null;
    public isSelfUnverify: boolean;

    static create(data: any): UnverifyLogSet | null {
        if (!data) { return null; }
        const item = new UnverifyLogSet();

        item.start = DateTime.fromISOString(data.start);
        item.channelsToKeep = data.channelIdsToKeep.map((o: any) => o as string);
        item.channelsToRemove = data.channelIdsToRemove.map((o: any) => o as string);
        item.end = DateTime.fromISOString(data.end);
        item.isSelfUnverify = data.isSelfUnverify;
        item.reason = data.reason;
        item.rolesToKeep = data.rolesToKeep.map((o: any) => Role.create(o));
        item.rolesToRemove = data.rolesToRemove.map((o: any) => Role.create(o));

        return item;
    }
}

export class UnverifyLogUpdate {
    public start: DateTime;
    public end: DateTime;

    static create(data: any): UnverifyLogUpdate | null {
        if (!data) { return null; }
        const item = new UnverifyLogUpdate();

        item.start = DateTime.fromISOString(data.start);
        item.end = DateTime.fromISOString(data.end);

        return item;
    }
}

export class UnverifyLogParams {
    public operation: UnverifyOperation | null = null;
    public guildId: string | null = null;
    public createdFrom: string | null = null;
    public createdTo: string | null = null;

    public pagination: PaginatedParams;
    public sort: SortParams;

    get queryParams(): QueryParam[] {
        return [
            this.operation != null ? new QueryParam('operation', this.operation) : null,
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.createdFrom ? new QueryParam('created.From', this.createdFrom) : null,
            this.createdTo ? new QueryParam('created.To', this.createdTo) : null,
            new QueryParam('sort.orderBy', this.sort.orderBy),
            new QueryParam('sort.descending', this.sort.descending),
            new QueryParam('pagination.page', this.pagination.page),
            new QueryParam('pagination.pageSize', this.pagination.pageSize)
        ].filter(o => o);
    }

    static get empty(): UnverifyLogParams {
        const params = new UnverifyLogParams();
        params.sort = {};
        params.pagination = new PaginatedParams();

        return params;
    }

    static create(form: any): UnverifyLogParams | null {
        if (!form) { return null; }
        const params = new UnverifyLogParams();

        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.guildId = form.guildId;
        params.operation = form.operation;

        return params;
    }

    setPagination(pagination: PaginatedParams): UnverifyLogParams {
        this.pagination = pagination;
        return this;
    }

    setSort(sort: SortParams): UnverifyLogParams {
        this.sort = sort;
        return this;
    }
}

export type UnverifyListSortTypes = 'operation' | 'guild' | 'createdAt';
