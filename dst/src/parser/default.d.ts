declare type token = {
    text: string;
    value: number;
    position: number;
};
/** 'abc123.456' => { text: '123', value: 123, position: 3 } */
export declare function defaultParser(str: string): token | null;
export {};
