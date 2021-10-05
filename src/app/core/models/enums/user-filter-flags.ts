export enum UserFilterFlags {
    BotAdmin = 1,
    WebAdmin = 2,
    NotUser = 4,
    HaveApiAccess = 8,
    HaveBirthday = 16
}

export enum UserFilterFlagsTexts {
    BotAdmin = 'Administrátor bota',
    WebAdmin = 'Přístup do webové administrace',
    NotUser = 'Je bot',
    HaveApiAccess = 'Má přístup na API',
    HaveBirthday = 'Má uložené narozeniny'
}
