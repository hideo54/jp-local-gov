import { describe, expect, it } from 'vitest';
import { findByCode, searchByName } from './lookup.js';

describe('findByCode', () => {
    describe('6-digit code', () => {
        it('finds prefecture', () => {
            expect(findByCode('270008')).toStrictEqual({
                type: 'prefecture',
                code: '270008',
                prefectureName: '大阪府',
                prefectureRuby: 'おおさかふ',
            });
        });
        it('finds municipality', () => {
            expect(findByCode('271004')).toStrictEqual({
                type: 'municipality',
                code: '271004',
                prefectureName: '大阪府',
                municipalityName: '大阪市',
                municipalityRuby: 'おおさかし',
            });
        });
        it('finds designated city ward', () => {
            expect(findByCode('271021')).toStrictEqual({
                type: 'designated-city-ward',
                code: '271021',
                prefectureName: '大阪府',
                municipalityName: '大阪市',
                cityName: '大阪市都島区',
                cityRuby: 'おおさかしみやこじまく',
            });
        });
    });

    describe('5-digit code', () => {
        it('finds same result as 6-digit code', () => {
            expect(findByCode('27000')).toStrictEqual(findByCode('270008'));
            expect(findByCode('27100')).toStrictEqual(findByCode('271004'));
        });
    });

    it('returns undefined for non-existent code', () => {
        expect(findByCode('99999')).toBeUndefined();
    });

    describe('invalid input', () => {
        it('throws for non-numeric input', () => {
            expect(() => findByCode('abcde')).toThrow('Invalid code format');
        });
        it('throws for too-long input', () => {
            expect(() => findByCode('1234567')).toThrow('Invalid code format');
        });
        it('throws for invalid check digit', () => {
            expect(() => findByCode('270009')).toThrow('Invalid check digit');
        });
    });
});

describe('searchByName', () => {
    describe('exact match', () => {
        it('finds prefecture', () => {
            const results = searchByName('大阪府');
            expect(results).toHaveLength(1);
            expect(results[0]).toMatchObject({ prefectureName: '大阪府' });
        });
        it('finds municipality', () => {
            const results = searchByName('大阪市');
            expect(results).toHaveLength(1);
            expect(results[0]).toMatchObject({ municipalityName: '大阪市' });
        });
        it('finds designated city ward', () => {
            const results = searchByName('大阪市都島区');
            expect(results).toHaveLength(1);
            expect(results[0]).toMatchObject({ cityName: '大阪市都島区' });
        });
        it('finds by ruby', () => {
            const results = searchByName('おおさかふ');
            expect(results).toHaveLength(1);
            expect(results[0]).toMatchObject({ prefectureName: '大阪府' });
        });
        it('returns empty array for no match', () => {
            expect(searchByName('存在しない自治体')).toHaveLength(0);
        });
        it('does not match partial strings — use partial option for that', () => {
            expect(searchByName('大阪')).toHaveLength(0);
            expect(
                searchByName('大阪', { partial: true }).length,
            ).toBeGreaterThan(0);
        });
    });

    describe('prefectureName filter', () => {
        it('returns multiple results for ambiguous name without filter', () => {
            const results = searchByName('府中市');
            expect(results).toHaveLength(2); // 東京都・広島県
        });
        it('narrows to 1 result with prefectureName', () => {
            const tokyo = searchByName('府中市', { prefectureName: '東京都' });
            expect(tokyo).toHaveLength(1);
            expect(tokyo[0]).toMatchObject({ prefectureName: '東京都' });

            const hiroshima = searchByName('府中市', {
                prefectureName: '広島県',
            });
            expect(hiroshima).toHaveLength(1);
            expect(hiroshima[0]).toMatchObject({ prefectureName: '広島県' });
        });
        it('filters designated city wards by prefectureName', () => {
            const results = searchByName('大阪市都島区', {
                prefectureName: '大阪府',
            });
            expect(results).toHaveLength(1);
            expect(results[0]).toMatchObject({ cityName: '大阪市都島区' });

            expect(
                searchByName('大阪市都島区', { prefectureName: '東京都' }),
            ).toHaveLength(0);
        });
    });

    describe('exclude options', () => {
        it('excludeDesignatedCityWards removes ward results', () => {
            expect(searchByName('大阪市都島区')).toHaveLength(1);
            expect(
                searchByName('大阪市都島区', {
                    excludeDesignatedCityWards: true,
                }),
            ).toHaveLength(0);
        });
        it('excludeMunicipalities removes municipality results', () => {
            expect(searchByName('大阪市')).toHaveLength(1);
            expect(
                searchByName('大阪市', { excludeMunicipalities: true }),
            ).toHaveLength(0);
        });
        it('excludePrefectures removes prefecture results', () => {
            expect(searchByName('大阪府')).toHaveLength(1);
            expect(
                searchByName('大阪府', { excludePrefectures: true }),
            ).toHaveLength(0);
        });
        it('excludePrefectures filters out prefecture from partial results', () => {
            const all = searchByName('奈良', { partial: true });
            expect(all.some(r => r.type === 'prefecture')).toBe(true); // 奈良県 included

            const withoutPrefectures = searchByName('奈良', {
                partial: true,
                excludePrefectures: true,
            });
            expect(withoutPrefectures.every(r => r.type !== 'prefecture')).toBe(
                true,
            );
            expect(
                withoutPrefectures.some(
                    r =>
                        r.type === 'municipality' &&
                        r.municipalityName === '奈良市',
                ),
            ).toBe(true);
        });
    });
});
