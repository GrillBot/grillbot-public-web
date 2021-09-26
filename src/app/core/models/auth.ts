import * as JwtDecode from 'jwt-decode';
import { DateTime } from './datetime';

export class OAuth2Link {
    public url: string;

    static create(data: any): OAuth2Link | null {
        if (!data) { return null; }

        const link = new OAuth2Link();
        link.url = data.url;
        return link;
    }
}

export class JwtToken {
    public uniqueName: string;
    public id: string;
    public issuer: string;
    public audience: string;

    static createFromToken(data: string): JwtToken | null {
        return this.create(JwtDecode(data));
    }

    static create(data: any): JwtToken | null {
        if (!data) { return null; }

        const token = new JwtToken();
        token.uniqueName = data.unique_name;
        token.audience = data.audience;
        token.id = data.nameid;
        token.issuer = data.issuer;

        return token;
    }
}

export class AuthToken {
    public errorMessage: string;
    public accessToken: string;
    public expiresAt: DateTime;

    get jwt(): JwtToken {
        return this.accessToken ? JwtToken.createFromToken(this.accessToken) : null;
    }

    get isExpired(): boolean {
        return this.expiresAt.compareWithNow() !== 'after';
    }

    static create(data: any): AuthToken | null {
        if (!data) { return null; }

        const token = new AuthToken();
        token.accessToken = data.accessToken;
        token.errorMessage = data.errorMessage;
        token.expiresAt = DateTime.fromISOString(data.expiresAt);

        return token;
    }

    serialize(): object {
        return {
            errorMessage: this.errorMessage,
            accessToken: this.accessToken,
            expiresAt: this.expiresAt.toISOString()
        };
    }
}
