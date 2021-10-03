export type token = {
    text: string,
    value: number,
    position: number,
}

type parser = (string: string) => token | null;

export function parse (string: string, parsers: parser[]): token[] {
    return _parse(0, string, parsers);

    function _parse (beginPos: number, string: string, parsers: parser[]): token[] {
        const tokens = parsers
        .map(fn => fn(string))
        .filter(i => i !== null) as token[];
        
        if (tokens.length === 0) {
            return [];
        } else {
            // 找出最前面，最長的 token
            const tkn = tokens.sort((a, b) => {
                if (a.position !== b.position) {
                    return a.position < b.position ? -1 : 1;
                } else {
                    return a.text.length > b.text.length ? -1 : 1;
                }
            })[0];
            const remains = _parse(
                beginPos + tkn.position + tkn.text.length,
                string.slice(tkn.position + tkn.text.length),
                parsers);
            return [{
                text: tkn.text,
                value: tkn.value,
                position: tkn.position + beginPos,
            }].concat(remains);
        }
    }
}
