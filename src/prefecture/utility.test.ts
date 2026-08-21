import { describe, expect, it } from 'vitest';
import { prefectureIds, prefectureInfos } from './data.js';
import type { PrefectureId } from './types.js';
import {
    comparePrefectureIds,
    getPrefectureInfoById,
    getPrefectureInfoByName,
    isPrefectureId,
} from './utility.js';

describe('prefectureIds', () => {
    it('matches the ids and order of prefectureInfos', () => {
        expect(prefectureIds).toStrictEqual(prefectureInfos.map(p => p.id));
    });
    it('covers all 47 prefectures', () => {
        expect(prefectureIds).toHaveLength(47);
        expect(new Set(prefectureIds).size).toBe(47);
    });
});

describe('comparePrefectureIds', () => {
    it('sorts prefectures in defined order', () => {
        const unsorted: PrefectureId[] = ['okinawa', 'hokkaido', 'tokyo'];
        expect(unsorted.sort(comparePrefectureIds)).toStrictEqual([
            'hokkaido',
            'tokyo',
            'okinawa',
        ]);
    });
});

describe('isPrefectureId', () => {
    it('returns true for valid id', () => {
        expect(isPrefectureId('osaka')).toBe(true);
    });
    it('returns false for unknown id', () => {
        expect(isPrefectureId('unknown')).toBe(false);
    });
});

describe('getPrefectureInfoById', () => {
    it('returns prefecture for valid id', () => {
        expect(getPrefectureInfoById('osaka')).toMatchObject({
            name: '大阪府',
        });
    });
    it('throws for unknown id', () => {
        expect(() => getPrefectureInfoById('unknown')).toThrow(
            'Item not found: unknown',
        );
    });
});

describe('getPrefectureInfoByName', () => {
    it('returns prefecture by full name with suffix', () => {
        expect(getPrefectureInfoByName('大阪府')).toMatchObject({
            id: 'osaka',
        });
    });
    it('returns prefecture by shortName', () => {
        expect(getPrefectureInfoByName('京都')).toMatchObject({ id: 'kyoto' });
    });
    it('throws for unknown name', () => {
        expect(() => getPrefectureInfoByName('架空県')).toThrow(
            'Item not found: 架空県',
        );
    });
});
