"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twParser = void 0;
function twParser(string) {
    return parse(0, string);
    function parse(pos, string) {
        var elem = string.match(/([一二三四五六七八九十]+)/);
        if (elem === null) {
            return null;
        }
        else {
            var value = parseCnInt(elem[1]);
            if (value === null) {
                var next = string.indexOf(elem[1]) + elem[1].length;
                return parse(next, string.slice(next));
            }
            else {
                return {
                    text: elem[1],
                    value: value,
                    position: pos + string.indexOf(elem[1]),
                };
            }
        }
    }
}
exports.twParser = twParser;
function ch2num(ch) {
    var map = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
    return map[ch] === undefined ? null : map[ch];
}
/** 五，十(一十)，十五(一十五)，二十，二十五 (1..99) */
function parseCnInt(string) {
    if (string.split('').filter(function (ch) { return ch === '十'; }).length > 1) {
        return null;
    }
    if (string.startsWith('十')) {
        return parseCnInt('一' + string);
    }
    var nums = string.split('').filter(function (ch) { return ch !== '十'; }).map(ch2num);
    if (allAre(nums, isNum)) {
        var res = parseInt(nums.join(''));
        return string.endsWith('十') ? res * 10 : res;
    }
    else {
        return null;
    }
}
function isNum(n) {
    return typeof n === 'number';
}
function allAre(list, check) {
    return list.every(function (i) { return check(i); });
}
