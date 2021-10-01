export class User {
    public id: string;
    public username: string;
    public discriminator: string;
    public isBot: boolean;
    public avatarUrl: string;

    get fullUsername(): string {
        return this.discriminator ? `${this.username}#${this.discriminator}` : this.username;
    }

    static create(data: any): User | null {
        if (!data) { return null; }

        const user = new User();

        user.id = data.id;
        user.isBot = data.isBot;
        user.avatarUrl = data.avatarUrl;
        user.discriminator = data.discriminator;
        user.username = data.username;

        return user;
    }
}
