"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
function parse(string, parsers) {
    return _parse(0, string, parsers);
    function _parse(beginPos, string, parsers) {
        var tokens = parsers
            .map(function (fn) { return fn(string); })
            .filter(function (i) { return i !== null; });
        if (tokens.length === 0) {
            return [];
        }
        else {
            // 找出最前面，最長的 token
            var tkn = tokens.sort(function (a, b) {
                if (a.position !== b.position) {
                    return a.position < b.position ? -1 : 1;
                }
                else {
                    return a.text.length > b.text.length ? -1 : 1;
                }
            })[0];
            var remains = _parse(beginPos + tkn.position + tkn.text.length, string.slice(tkn.position + tkn.text.length), parsers);
            return [{
                    text: tkn.text,
                    value: tkn.value,
                    position: tkn.position + beginPos,
                }].concat(remains);
        }
    }
}
exports.parse = parse;
