"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCmp = exports.twParser = exports.defaultParser = void 0;
var default_1 = require("./parser/default");
var default_2 = require("./parser/default");
Object.defineProperty(exports, "defaultParser", { enumerable: true, get: function () { return default_2.defaultParser; } });
var tw_1 = require("./parser/tw");
var tw_2 = require("./parser/tw");
Object.defineProperty(exports, "twParser", { enumerable: true, get: function () { return tw_2.twParser; } });
var utils_1 = require("./index/utils");
function makeCmp(parsers) {
    return function (a, b) {
        var atkns = (0, utils_1.parse)(a, parsers || [default_1.defaultParser, tw_1.twParser]);
        var btkns = (0, utils_1.parse)(b, parsers || [default_1.defaultParser, tw_1.twParser]);
        var values = atkns.concat(btkns).map(function (tkn) { return tkn.value; });
        if (values.some(function (value) { return !isPositiveInt(value); })) {
            throw new Error('parser should get only positive integer');
        }
        if (isSameFmt(a, b, atkns, btkns)) {
            var maxLen_1 = Math.max.apply(Math, values.map(function (v) { return v.toString().length; }));
            var a2 = replace(a, atkns.map(function (t) { return ({
                from: t.position,
                length: t.text.length,
                newText: leftPadding(t.value.toString(), '0', maxLen_1)
            }); }));
            var b2 = replace(b, btkns.map(function (t) { return ({
                from: t.position,
                length: t.text.length,
                newText: leftPadding(t.value.toString(), '0', maxLen_1)
            }); }));
            return a2.localeCompare(b2);
        }
        else {
            return a.localeCompare(b);
        }
    };
}
exports.makeCmp = makeCmp;
function isSameFmt(a, b, aTokens, bTokens) {
    return JSON.stringify(skeleton(a, aTokens)) === JSON.stringify(skeleton(b, bTokens));
}
function skeleton(string, tokens) {
    var text = replace(string, tokens.map(function (tkn) { return ({
        from: tkn.position,
        length: tkn.text.length,
        newText: String.fromCharCode(0),
    }); }));
    return text.split(String.fromCharCode(0));
}
function isPositiveInt(number) {
    return number.toString().match(/^\d+$/) !== null;
}
function leftPadding(str, char, length) {
    if (str.length >= length) {
        return str;
    }
    else {
        return leftPadding(char[0] + str, char, length);
    }
}
function replace(string, targets) {
    return targets.reverse()
        .reduce(function (acc, _a) {
        var from = _a.from, length = _a.length, newText = _a.newText;
        return acc.slice(0, from) + newText + acc.slice(from + length);
    }, string);
}
