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
