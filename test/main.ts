import * as assert from 'assert';
import { makeCmp, twParser } from '../src/index';

declare const describe: any, it: any;

describe('main', () => {
    it('all mix', () => {
        const src = [
            '沙丘 十二', '沙丘 十', '沙丘 四', '沙丘 一', '沙丘 七',
            'book 1.2.1 (2001)', 'book 1.11.1 (2001)', 'book 1.2.1 (93)',
        ];
        const expects = [
            'book 1.2.1 (93)', 'book 1.2.1 (2001)', 'book 1.11.1 (2001)',
            '沙丘 一', '沙丘 四', '沙丘 七', '沙丘 十', '沙丘 十二',
        ];
        assert.equal(JSON.stringify(src.sort(makeCmp())), JSON.stringify(expects));
    });

    it('normal', () => {
        const src = '第1名,第3名,第9名,第10名,第11名,第12名,第2名';
        const dst = src.split(',').sort(makeCmp()).join(',');
        assert.equal(dst, '第1名,第2名,第3名,第9名,第10名,第11名,第12名');
    });

    it('semver version like (v.1.0.5)', () => {
        const src = 'v1.0.0 v10.1.2 v9.1.2 v9.2.3 v9.2.103 v10.2.1 v10.10.1';
        const dsts = src.split(' ').sort(makeCmp());
        const expects = [
            'v1.0.0',
            'v9.1.2',
            'v9.2.3',
            'v9.2.103',
            'v10.1.2',
            'v10.2.1',
            'v10.10.1',
        ];
        assert.equal(dsts.join(' '), expects.join(' '));
    });

    it('中文 (十、二十、二十一...)', () => {
        const src = '第二十名,第二十三名,第三十一名,第一名,第二名,第三名,第五名,第四名,第六名,第七名,第八名,第九名,第十名,第十一名,第十三名,第十二名';
        const dsts = src.split(',').sort(makeCmp());
        const expects = [
            '第一名',
            '第二名',
            '第三名',
            '第四名',
            '第五名',
            '第六名',
            '第七名',
            '第八名',
            '第九名',
            '第十名',
            '第十一名',
            '第十二名',
            '第十三名',
            '第二十名',
            '第二十三名',
            '第三十一名',
        ];
        assert.equal(dsts.join(' '), expects.join(' '));
    });
});
