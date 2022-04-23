import { QueryParam } from './http';
import { DateTime } from './datetime';
import { User } from './users';
import { PaginatedParams, SortParams } from './common';

export class RemindMessage {
    public id: number;
    public fromUser: User | null;
    public at: DateTime;
    public message: string;
    public postpone: number;
    public notified: boolean;

    static create(data: any): RemindMessage | null {
        if (!data) { return null; }
        const message = new RemindMessage();

        message.at = DateTime.fromISOString(data.at);
        message.fromUser = data.fromUser ? User.create(data.fromUser) : null;
        message.id = data.id;
        message.message = data.message;
        message.postpone = data.postpone;
        message.notified = data.notified;

        return message;
    }
}

export class GetReminderListParams {
    public fromUserId: string | null = null;
    public messageContains: string | null = null;
    public createdFrom: string | null = null;
    public createdTo: string | null = null;
    public onlyWaiting = false;

    public pagination: PaginatedParams;
    public sort: SortParams;

    static get empty(): GetReminderListParams {
        const params = new GetReminderListParams();
        params.sort = {};
        params.pagination = new PaginatedParams()

        return params;
    }

    get queryParams(): QueryParam[] {
        return [
            this.fromUserId ? new QueryParam('fromUserId', this.fromUserId) : null,
            this.messageContains ? new QueryParam('messageContains', this.messageContains) : null,
            this.createdFrom ? new QueryParam('created.From', this.createdFrom) : null,
            this.createdTo ? new QueryParam('created.To', this.createdTo) : null,
            new QueryParam('onlyWaiting', this.onlyWaiting),
            new QueryParam('sort.orderBy', this.sort.orderBy),
            new QueryParam('sort.descending', this.sort.descending),
            new QueryParam('pagination.page', this.pagination.page),
            new QueryParam('pagination.pageSize', this.pagination.pageSize)
        ].filter(o => o);
    }

    /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
    static create(form: any): GetReminderListParams | null {
        if (!form) { return null; }
        const params = new GetReminderListParams();

        params.createdFrom = form.createdFrom;
        params.createdTo = form.createdTo;
        params.fromUserId = form.fromUserId;
        params.messageContains = form.messageContains;
        params.onlyWaiting = form.onlyWaiting;

        return params;
    }

    setPagination(pagination: PaginatedParams): GetReminderListParams {
        this.pagination = pagination;
        return this;
    }

    setSort(sort: SortParams): GetReminderListParams {
        this.sort = sort;
        return this;
    }
}

export type RemindListSortTypes = 'id' | 'fromUser' | 'at' | 'postpone';
