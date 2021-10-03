"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var index_1 = require("../src/index");
var utils_1 = require("../src/index/utils");
describe('parse', function () {
    it('ok', function () {
        var src = '一十十 15 十五 十十五 20 二十 三十十 三十五 40';
        var expect = '15,十五,20,二十,三十五,40';
        var tkns = (0, utils_1.parse)(src, [index_1.defaultParser, index_1.twParser]);
        var dst = tkns
            .map(function (tkn) { return src.slice(tkn.position, tkn.position + tkn.text.length); })
            .join(',');
        assert.equal(dst, expect);
    });
    it('not found', function () {
        var src = '一十十 十十五';
        var tkns = (0, utils_1.parse)(src, [index_1.defaultParser, index_1.twParser]);
        assert.equal(tkns.length, 0);
    });
});
