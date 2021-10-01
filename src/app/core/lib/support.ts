export class Support {
    static getEnumKeyByValue(type: any, value: any): string {
        return Object.keys(type).find(o => type[o] === value);
    }

    static cut(value: string, maxLength: number): string {
        return value.length <= maxLength ? value : `${value.substring(0, maxLength - 3)}...`;
    }

    static flattern<T>(arr: Array<T>): any[] {
        const result = [];

        for (const item of arr) {
            if (Array.isArray(item)) {
                result.push(...this.flattern(item));
            } else {
                result.push(item);
            }
        }

        return result;
    }
}
