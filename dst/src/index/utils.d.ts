export declare type token = {
    text: string;
    value: number;
    position: number;
};
declare type parser = (string: string) => token | null;
export declare function parse(string: string, parsers: parser[]): token[];
export {};
