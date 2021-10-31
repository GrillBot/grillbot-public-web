export enum UserFlags {
    None = 0,
    BotAdmin = 1,
    WebAdmin = 2,
    NotUser = 4,
    WebAdminOnline = 8
}

export enum UserFlagsTexts {
    None = '',
    BotAdmin = 'Administrátor bota',
    WebAdmin = 'Přístup do webové administrace',
    NotUser = 'Není uživatel',
    WebAdminOnline = 'Přihlášen do webové administrace'
}
