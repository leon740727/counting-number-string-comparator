type token = {
    text: string,
    value: number,
    position: number,
}

export function twParser (string: string): token | null {
    return parse(0, string);
    function parse (pos: number, string: string): token | null {
        const elem = string.match(/([一二三四五六七八九十]+)/);
        if (elem === null) {
            return null;
        } else {
            const value = parseCnInt(elem[1]);
            if (value === null) {
                const next = string.indexOf(elem[1]) + elem[1].length;
                return parse(next, string.slice(next));
            } else {
                return {
                    text: elem[1],
                    value: value,
                    position: pos + string.indexOf(elem[1]),
                }
            }
        }
    }
}

function ch2num (ch: string): number | null {
    const map: { [k: string]: number } = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
    return map[ch] === undefined ? null : map[ch];
}

/** 五，十(一十)，十五(一十五)，二十，二十五 (1..99) */
function parseCnInt(string: string): number | null {
    if (string.split('').filter(ch => ch === '十').length > 1) {
        return null;
    }
    if (string.startsWith('十')) {
        return parseCnInt('一' + string);
    }
    const nums = string.split('').filter(ch => ch !== '十').map(ch2num);
    if (allAre(nums, isNum)) {
        const res = parseInt(nums.join(''));
        return string.endsWith('十') ? res * 10 : res;
    } else {
        return null;
    }
}

function isNum (n: any): n is number {
    return typeof n === 'number';
}

function allAre <data> (list: any[], check: (data: any) => data is data): list is data[] {
    return list.every(i => check(i));
}
