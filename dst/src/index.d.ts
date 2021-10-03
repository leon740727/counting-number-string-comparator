export { defaultParser } from './parser/default';
export { twParser } from './parser/tw';
export declare type token = {
    text: string;
    value: number;
    position: number;
};
declare type parser = (string: string) => token | null;
export declare function makeCmp(parsers?: parser[]): (a: string, b: string) => number;
