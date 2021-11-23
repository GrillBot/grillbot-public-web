import { UserStatus, UserStatusTexts } from 'src/app/core/models/enums/user-status';
import { ConnectionState, ConnectionStateTexts } from './enums/connection-state';
import { DateTime } from './datetime';
import { Support } from '../lib/support';

export class DiagnosticsInfo {
    public instanceType: string;
    public startAt: DateTime;
    public uptime: string;
    public cpuTime: string;
    public latency: string;
    public connectionState: ConnectionState;
    public usedMemory: number;
    public userStatus: UserStatus;
    public currentDateTime: DateTime;

    get formattedConnectionState(): string {
        return ConnectionStateTexts[Support.getEnumKeyByValue(ConnectionState, this.connectionState)] as string;
    }

    get botStatus(): string {
        return UserStatusTexts[Support.getEnumKeyByValue(UserStatus, this.userStatus)] as string;
    }

    static create(data: any): DiagnosticsInfo | null {
        if (!data) { return null; }
        const info = new DiagnosticsInfo();

        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        info.connectionState = data.connectionState;
        info.cpuTime = data.cpuTime;
        info.instanceType = data.instanceType;
        info.latency = data.latency;
        info.startAt = DateTime.fromISOString(data.startAt as string);
        info.uptime = data.uptime;
        info.usedMemory = data.usedMemory;
        info.userStatus = data.userStatus;
        info.currentDateTime = DateTime.fromISOString(data.currentDateTime as string);
        /* eslint-enable */

        return info;
    }
}

export class CommandStatisticItem {
    public command: string;
    public lastCall: DateTime;
    public successCount: number;
    public failedCount: number;
    public successRate: number;

    static create(data: any): CommandStatisticItem | null {
        if (!data) { return null; }
        const item = new CommandStatisticItem();

        item.command = data.command;
        item.failedCount = data.failedCount;
        item.lastCall = DateTime.fromISOString(data.lastCall);
        item.successCount = data.successCount;
        item.successRate = data.successRate;

        return item;
    }
}
