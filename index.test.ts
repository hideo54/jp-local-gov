import * as code from './src/code';

describe('verifyCheckDigit', () => {
    it('Returns true to valid code', () => {
        expect(code.verifyCheckDigit('123456')).toBeFalsy();
    });
    it('Returns false to invalid code', () => {
        expect(code.verifyCheckDigit('062014')).toBeTruthy();
    });
});

describe('getCodeInfo', () => {
    it('Returns correct info from ward code', () => {
        expect(code.getCodeInfo('271021')).toStrictEqual({
            code: '271021',
            type: 'ward',
            name: '都島区',
            ruby: 'みやこじまく',
            municipality: {
                code: '271004',
                type: 'municipality',
                name: '大阪市',
                ruby: 'おおさかし',
            },
            prefecture: {
                code: '270008',
                type: 'prefecture',
                name: '大阪府',
                ruby: 'おおさかふ',
            },
        });
    });
    it('Returns correct info from municipality code (including wards if exist)', () => {
        expect(code.getCodeInfo('131172')).toStrictEqual({
            code: '131172',
            type: 'municipality',
            name: '北区',
            ruby: 'きたく',
            prefecture: {
                code: '130001',
                type: 'prefecture',
                name: '東京都',
                ruby: 'とうきょうと',
            },
        });
        expect(code.getCodeInfo('221007')).toStrictEqual({
            code: '221007',
            type: 'municipality',
            name: '静岡市',
            ruby: 'しずおかし',
            wards: [
                { code: '221015', type: 'ward', name: '葵区', ruby: 'あおいく' },
                { code: '221023', type: 'ward', name: '駿河区', ruby: 'するがく' },
                { code: '221031', type: 'ward', name: '清水区', ruby: 'しみずく' },
            ],
            prefecture: {
                code: '220001',
                type: 'prefecture',
                name: '静岡県',
                ruby: 'しずおかけん',
            }
        });
    });
    it('Returns correct info from municipality code', () => {
        expect(code.getCodeInfo('370002')).toStrictEqual({
            code: '370002',
            type: 'prefecture',
            name: '香川県',
            ruby: 'かがわけん',
            municipalities: [
                { code: '372013', type: 'municipality', name: '高松市', ruby: 'たかまつし' },
                { code: '372021', type: 'municipality', name: '丸亀市', ruby: 'まるがめし' },
                { code: '372030', type: 'municipality', name: '坂出市', ruby: 'さかいでし' },
                { code: '372048', type: 'municipality', name: '善通寺市', ruby: 'ぜんつうじし' },
                { code: '372056', type: 'municipality', name: '観音寺市', ruby: 'かんおんじし' },
                { code: '372064', type: 'municipality', name: 'さぬき市', ruby: 'さぬきし' },
                { code: '372072', type: 'municipality', name: '東かがわ市', ruby: 'ひがしかがわし' },
                { code: '372081', type: 'municipality', name: '三豊市', ruby: 'みとよし' },
                { code: '373222', type: 'municipality', name: '土庄町', ruby: 'とのしょうちょう' },
                { code: '373249', type: 'municipality', name: '小豆島町', ruby: 'しょうどしまちょう' },
                { code: '373419', type: 'municipality', name: '三木町', ruby: 'みきちょう' },
                { code: '373648', type: 'municipality', name: '直島町', ruby: 'なおしまちょう' },
                { code: '373869', type: 'municipality', name: '宇多津町', ruby: 'うたづちょう' },
                { code: '373877', type: 'municipality', name: '綾川町', ruby: 'あやがわちょう' },
                { code: '374032', type: 'municipality', name: '琴平町', ruby: 'ことひらちょう' },
                { code: '374041', type: 'municipality', name: '多度津町', ruby: 'たどつちょう' },
                { code: '374067', type: 'municipality', name: 'まんのう町', ruby: 'まんのうちょう' },
            ],
        });
    });
});
