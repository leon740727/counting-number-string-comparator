"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var index_1 = require("../src/index");
describe('parser-tw', function () {
    it('ok: 五', function () {
        var src = '.五.';
        var expect = {
            text: '五',
            value: 5,
            position: 1,
        };
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('ok: 十', function () {
        var src = '.十.';
        var expect = {
            text: '十',
            value: 10,
            position: 1,
        };
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('ok: 十五', function () {
        var src = '.十五.';
        var expect = {
            text: '十五',
            value: 15,
            position: 1,
        };
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('ok: 五十', function () {
        var src = '.五十.';
        var expect = {
            text: '五十',
            value: 50,
            position: 1,
        };
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('ok: 二十五', function () {
        var src = '.二十五.';
        var expect = {
            text: '二十五',
            value: 25,
            position: 1,
        };
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('null', function () {
        var src = '.五十十.';
        var expect = null;
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('ok: 二十五', function () {
        var src = '.五十十.二十五..';
        var expect = {
            text: '二十五',
            value: 25,
            position: 5,
        };
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
    it('null', function () {
        var src = '.五十十.十十五..';
        var expect = null;
        assert.equal(JSON.stringify((0, index_1.twParser)(src)), JSON.stringify(expect));
    });
});
