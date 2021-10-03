type token = {
    text: string,
    value: number,
    position: number,
}

/** 'abc123.456' => { text: '123', value: 123, position: 3 } */
export function defaultParser (str: string): token | null {
    const elem = str.match(/([0-9]+)/);
    if (elem === null) {
        return null;
    } else {
        return {
            text: elem[1],
            value: parseInt(elem[1]),
            position: str.indexOf(elem[1]),
        }
    }
}
