import * as assert from 'assert';
import { defaultParser, twParser } from '../src/index';
import { parse } from '../src/index/utils';

declare const describe: any, it: any;

describe('parse', () => {
    it('ok', () => {
        const src = '一十十 15 十五 十十五 20 二十 三十十 三十五 40';
        const expect = '15,十五,20,二十,三十五,40';
        const tkns = parse(src, [defaultParser, twParser]);
        const dst = tkns
        .map(tkn => src.slice(tkn.position, tkn.position + tkn.text.length))
        .join(',');
        assert.equal(dst, expect);
    });

    it('not found', () => {
        const src = '一十十 十十五';
        const tkns = parse(src, [defaultParser, twParser]);
        assert.equal(tkns.length, 0);
    });
});
