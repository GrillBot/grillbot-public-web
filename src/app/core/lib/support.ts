export class Support {
    static getEnumKeyByValue(type: any, value: any): string {
        return Object.keys(type).find(o => type[o] === value);
    }

    static cut(value: string, maxLength: number): string {
        return value.length <= maxLength ? value : `${value.substring(0, maxLength - 3)}...`;
    }
}
