"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultParser = void 0;
/** 'abc123.456' => { text: '123', value: 123, position: 3 } */
function defaultParser(str) {
    var elem = str.match(/([0-9]+)/);
    if (elem === null) {
        return null;
    }
    else {
        return {
            text: elem[1],
            value: parseInt(elem[1]),
            position: str.indexOf(elem[1]),
        };
    }
}
exports.defaultParser = defaultParser;
