import { Support } from '../../lib/support';

export enum AuditLogItemType {
    Info = 1,
    Warning = 2,
    Error = 3,
    Command = 4,
    ChannelCreated = 5,
    ChannelDeleted = 6,
    ChannelUpdated = 7,
    EmojiDeleted = 8,
    OverwriteCreated = 9,
    OverwriteDeleted = 10,
    OverwriteUpdated = 11,
    Unban = 12,
    MemberUpdated = 13,
    MemberRoleUpdated = 14,
    GuildUpdated = 15,
    UserLeft = 16,
    UserJoined = 17,
    MessageEdited = 18,
    MessageDeleted = 19
}

export const AuditLogAllTypes = [
    AuditLogItemType.Info,
    AuditLogItemType.Warning,
    AuditLogItemType.Error,
    AuditLogItemType.Command,
    AuditLogItemType.ChannelCreated,
    AuditLogItemType.ChannelDeleted,
    AuditLogItemType.ChannelUpdated,
    AuditLogItemType.EmojiDeleted,
    AuditLogItemType.OverwriteCreated,
    AuditLogItemType.OverwriteDeleted,
    AuditLogItemType.OverwriteUpdated,
    AuditLogItemType.Unban,
    AuditLogItemType.MemberUpdated,
    AuditLogItemType.MemberRoleUpdated,
    AuditLogItemType.GuildUpdated,
    AuditLogItemType.UserLeft,
    AuditLogItemType.UserJoined,
    AuditLogItemType.MessageEdited,
    AuditLogItemType.MessageDeleted
];

export enum AuditLogItemTypeTexts {
    Info = 'Informační zpráva',
    Warning = 'Varování',
    Error = 'Chyba',
    Command = 'Příkaz',
    ChannelCreated = 'Vytvořen kanál',
    ChannelDeleted = 'Smazán kanál',
    ChannelUpdated = 'Upraven kanál',
    EmojiDeleted = 'Smazán emote',
    OverwriteCreated = 'Vytvořena výjimka do kanálu',
    OverwriteDeleted = 'Smazána výjimka do kanálu',
    OverwriteUpdated = 'Upravena výjimka do kanálu',
    Unban = 'Odblokován uživatel',
    MemberUpdated = 'Upraven uživatel',
    MemberRoleUpdated = 'Role uživatele upraveny.',
    GuildUpdated = 'Server upraven',
    UserLeft = 'Uživatel opustil server',
    UserJoined = 'Uživatel se připojil na server',
    MessageEdited = 'Zpráva upravena',
    MessageDeleted = 'Zpráva odebrána'
}

export enum AuditLogItemTypeMask {
    Info = 1,
    Warning = 2,
    Error = 4,
    Command = 8,
    ChannelCreated = 16,
    ChannelDeleted = 32,
    ChannelUpdated = 64,
    EmojiDeleted = 128,
    OverwriteCreated = 256,
    OverwriteDeleted = 512,
    OverwriteUpdated = 1024,
    Unban = 2048,
    MemberUpdated = 4096,
    MemberRoleUpdated = 8192,
    GuildUpdated = 16384,
    UserLeft = 32768,
    UserJoined = 65536,
    MessageEdited = 131072,
    MessageDeleted = 262144
}

export const convertMaskToTypes = (value: number): AuditLogItemType[] => {
    const result: AuditLogItemType[] = [];

    // tslint:disable: no-bitwise
    if ((value & AuditLogItemTypeMask.Info) !== 0) { result.push(AuditLogItemType.Info); }
    if ((value & AuditLogItemTypeMask.Warning) !== 0) { result.push(AuditLogItemType.Warning); }
    if ((value & AuditLogItemTypeMask.Error) !== 0) { result.push(AuditLogItemType.Error); }
    if ((value & AuditLogItemTypeMask.Command) !== 0) { result.push(AuditLogItemType.Command); }
    if ((value & AuditLogItemTypeMask.ChannelCreated) !== 0) { result.push(AuditLogItemType.ChannelCreated); }
    if ((value & AuditLogItemTypeMask.ChannelDeleted) !== 0) { result.push(AuditLogItemType.ChannelDeleted); }
    if ((value & AuditLogItemTypeMask.ChannelUpdated) !== 0) { result.push(AuditLogItemType.ChannelUpdated); }
    if ((value & AuditLogItemTypeMask.EmojiDeleted) !== 0) { result.push(AuditLogItemType.EmojiDeleted); }
    if ((value & AuditLogItemTypeMask.OverwriteCreated) !== 0) { result.push(AuditLogItemType.OverwriteCreated); }
    if ((value & AuditLogItemTypeMask.OverwriteDeleted) !== 0) { result.push(AuditLogItemType.OverwriteDeleted); }
    if ((value & AuditLogItemTypeMask.OverwriteUpdated) !== 0) { result.push(AuditLogItemType.OverwriteUpdated); }
    if ((value & AuditLogItemTypeMask.Unban) !== 0) { result.push(AuditLogItemType.Unban); }
    if ((value & AuditLogItemTypeMask.MemberUpdated) !== 0) { result.push(AuditLogItemType.MemberUpdated); }
    if ((value & AuditLogItemTypeMask.MemberRoleUpdated) !== 0) { result.push(AuditLogItemType.MemberRoleUpdated); }
    if ((value & AuditLogItemTypeMask.GuildUpdated) !== 0) { result.push(AuditLogItemType.GuildUpdated); }
    if ((value & AuditLogItemTypeMask.UserLeft) !== 0) { result.push(AuditLogItemType.UserLeft); }
    if ((value & AuditLogItemTypeMask.UserJoined) !== 0) { result.push(AuditLogItemType.UserJoined); }
    if ((value & AuditLogItemTypeMask.MessageEdited) !== 0) { result.push(AuditLogItemType.MessageEdited); }
    if ((value & AuditLogItemTypeMask.MessageDeleted) !== 0) { result.push(AuditLogItemType.MessageDeleted); }

    return result;
};

export const convertTypesToMask = (types: AuditLogItemType[]): number => {
    let result = 0;

    for (const t of types) {
        result |= AuditLogItemTypeMask[Support.getEnumKeyByValue(AuditLogItemType, t)]
    }

    return result;
}
