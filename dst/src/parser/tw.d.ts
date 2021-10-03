declare type token = {
    text: string;
    value: number;
    position: number;
};
export declare function twParser(string: string): token | null;
export {};
