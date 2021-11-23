import { DateTime } from './datetime';
import { User } from './users';

export class InviteBase {
    public code: string;
    public createdAt?: DateTime;

    static create(data: any): InviteBase | null {
        if (!data) { return null; }
        const item = new InviteBase();

        item.code = data.code;
        item.createdAt = data.createdAt ? DateTime.fromISOString(data.createdAt) : null;

        return item;
    }
}

export class Invite extends InviteBase {
    public creator: User;
    public usedUsersCount: number;

    static create(data: any): Invite {
        if (!data) { return null; }
        const base = super.create(data);
        const invite = new Invite();

        invite.code = base.code;
        invite.createdAt = base.createdAt;
        invite.creator = data.creator ? User.create(data.creator) : null;
        invite.usedUsersCount = data.usedUsersCount;

        return invite;
    }
}
