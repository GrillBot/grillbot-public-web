import { Channel } from './channels';
import { Guild } from './guilds';
import { QueryParam } from './http';
import { User } from './users';

export class SearchingListItem {
    public id: number;
    public user: User;
    public guild: Guild;
    public channel: Channel;
    public message: string;
    public jumpLink: string;

    static create(data: any): SearchingListItem | null {
        if (!data) { return null; }
        const item = new SearchingListItem();

        item.channel = Channel.create(data.channel);
        item.guild = Guild.create(data.guild);
        item.id = data.id;
        item.jumpLink = data.jumpLink;
        item.message = data.message;
        item.user = User.create(data.user);

        return item;
    }
}

export class GetSearchingListParams {
    public userId: string | null = null;
    public guildId: string | null = null;
    public channelId: string | null = null;

    get queryParams(): QueryParam[] {
        return [
            this.userId ? new QueryParam('userId', this.userId) : null,
            this.guildId ? new QueryParam('guildId', this.guildId) : null,
            this.channelId ? new QueryParam('channelId', this.channelId) : null
        ].filter(o => o);
    }

    static get empty(): GetSearchingListParams { return new GetSearchingListParams(); }

    static create(form: any): GetSearchingListParams | null {
        if (!form) { return null; }
        const params = new GetSearchingListParams();

        params.userId = form.userId;
        params.guildId = form.guildId;
        params.channelId = form.channelId;

        return params;
    }
}

export type SearchingListSortTypes = 'id' | 'user' | 'guild' | 'channel';
