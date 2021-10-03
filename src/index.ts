import { defaultParser } from './parser/default';
export { defaultParser } from './parser/default';
import { twParser } from './parser/tw';
export { twParser } from './parser/tw';
import { parse } from './index/utils';

export type token = {
    text: string,
    value: number,
    position: number,
}

type parser = (string: string) => token | null;

export function makeCmp (parsers?: parser[]) {
    return (a: string, b: string): number => {
        const atkns = parse(a, parsers || [defaultParser, twParser]);
        const btkns = parse(b, parsers || [defaultParser, twParser]);
        const values = atkns.concat(btkns).map(tkn => tkn.value);

        if (values.some(value => ! isPositiveInt(value))) {
            throw new Error('parser should get only positive integer');
        }

        if (isSameFmt(a, b, atkns, btkns)) {
            const maxLen = Math.max(...values.map(v => v.toString().length));
            const a2 = replace(a, atkns.map(t => ({
                from: t.position,
                length: t.text.length,
                newText: leftPadding(t.value.toString(), '0', maxLen)})));
            const b2 = replace(b, btkns.map(t => ({
                from: t.position,
                length: t.text.length,
                newText: leftPadding(t.value.toString(), '0', maxLen)})));
            return a2.localeCompare(b2);
        } else {
            return a.localeCompare(b);
        }
    }
}

function isSameFmt (a: string, b: string, aTokens: token[], bTokens: token[]) {
    return JSON.stringify(skeleton(a, aTokens)) === JSON.stringify(skeleton(b, bTokens));
}

function skeleton (string: string, tokens: token[]) {
    const text = replace(string, tokens.map(tkn => ({
        from: tkn.position,
        length: tkn.text.length,
        newText: String.fromCharCode(0),
    })));
    return text.split(String.fromCharCode(0));
}

function isPositiveInt (number: number) {
    return number.toString().match(/^\d+$/) !== null;
}

function leftPadding (str: string, char: string, length: number): string {
    if (str.length >= length) {
        return str;
    } else {
        return leftPadding(char[0] + str, char, length);
    }
}

function replace (string: string, targets: { from: number, length: number, newText: string}[]) {
    return targets.reverse()
    .reduce((acc, { from, length, newText }) => {
        return acc.slice(0, from) + newText + acc.slice(from + length);
    }, string);
}
