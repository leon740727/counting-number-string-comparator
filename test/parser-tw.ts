import * as assert from 'assert';
import { twParser } from '../src/index';

declare const describe: any, it: any;

describe('parser-tw', () => {
    it('ok: 五', () => {
        const src = '.五.';
        const expect = {
            text: '五',
            value: 5,
            position: 1,
        }
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('ok: 十', () => {
        const src = '.十.';
        const expect = {
            text: '十',
            value: 10,
            position: 1,
        }
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('ok: 十五', () => {
        const src = '.十五.';
        const expect = {
            text: '十五',
            value: 15,
            position: 1,
        }
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('ok: 五十', () => {
        const src = '.五十.';
        const expect = {
            text: '五十',
            value: 50,
            position: 1,
        }
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('ok: 二十五', () => {
        const src = '.二十五.';
        const expect = {
            text: '二十五',
            value: 25,
            position: 1,
        }
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('null', () => {
        const src = '.五十十.';
        const expect = null;
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('ok: 二十五', () => {
        const src = '.五十十.二十五..';
        const expect = {
            text: '二十五',
            value: 25,
            position: 5,
        };
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });

    it('null', () => {
        const src = '.五十十.十十五..';
        const expect = null;
        assert.equal(JSON.stringify(twParser(src)), JSON.stringify(expect));
    });
});
