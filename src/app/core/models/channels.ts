import { DateTime } from './datetime';
import { ChannelType } from './enums/channel-type';

export class Channel {
    public id: string;
    public name: string;
    public type: ChannelType;

    static create(data: any): Channel | null {
        if (!data) { return null; }

        const channel = new Channel();

        channel.name = data.name;
        channel.type = data.type;
        channel.id = data.id;

        return channel;
    }
}

export class ChannelStatItem {
    public channel: Channel;
    public count: number;
    public firstMessageAt: DateTime;
    public lastMessageAt: DateTime;

    static create(data: any): ChannelStatItem | null {
        if (!data) { return null; }
        const item = new ChannelStatItem();

        item.channel = Channel.create(data.channel);
        item.count = data.count;
        item.firstMessageAt = DateTime.fromISOString(data.firstMessageAt);
        item.lastMessageAt = DateTime.fromISOString(data.lastMessageAt);

        return item;
    }
}
