import { describe, expect, it } from 'vitest';
import {
    getShuDistrictCounts,
    getShuHireiBlockForPrefecture,
    getShuHireiBlockId,
    getShuHireiBlockName,
    getShuHireiBlockPrefectures,
    getShuHireiBlockSeatCounts,
    isShuHireiBlockId,
} from './utility.js';

describe('isShuHireiBlockId', () => {
    it('returns true for valid id', () => {
        expect(isShuHireiBlockId('kinki')).toBe(true);
    });
    it('returns false for unknown id', () => {
        expect(isShuHireiBlockId('unknown')).toBe(false);
    });
});

describe('getShuDistrictCounts', () => {
    it('returns correct counts for a known election date', () => {
        // 第49回 (2021-10-31) の区割り
        expect(getShuDistrictCounts('2021-10-31').tokyo).toStrictEqual(25);
        // 第50回 (2024-10-27) の区割り
        expect(getShuDistrictCounts('2024-10-27').tokyo).toStrictEqual(30);
    });
    it('throws for a date predating the electoral system', () => {
        expect(() => getShuDistrictCounts('1990-01-01')).toThrow(
            'Date predates the current electoral system: 1990-01-01',
        );
    });
});

describe('getShuHireiBlockSeatCounts', () => {
    it('returns correct counts for a known election date', () => {
        // 第49回 (2021-10-31) の比例議席数
        expect(getShuHireiBlockSeatCounts('2021-10-31').tokyo).toStrictEqual(
            17,
        );
        // 第50回 (2024-10-27) の比例議席数
        expect(getShuHireiBlockSeatCounts('2024-10-27').tokyo).toStrictEqual(
            19,
        );
    });
    it('throws for a date predating the electoral system', () => {
        expect(() => getShuHireiBlockSeatCounts('1990-01-01')).toThrow(
            'Date predates the current electoral system: 1990-01-01',
        );
    });
});

describe('getShuHireiBlockName', () => {
    it('returns name for valid id', () => {
        expect(getShuHireiBlockName('kinki')).toStrictEqual('近畿');
    });
    it('throws for unknown id', () => {
        expect(() => getShuHireiBlockName('unknown')).toThrow(
            'Item not found: unknown',
        );
    });
});

describe('getShuHireiBlockId', () => {
    it('returns id for valid name', () => {
        expect(getShuHireiBlockId('近畿')).toStrictEqual('kinki');
    });
    it('throws for unknown name', () => {
        expect(() => getShuHireiBlockId('不明')).toThrow(
            'Item not found: 不明',
        );
    });
});

describe('getShuHireiBlockPrefectures', () => {
    it('returns prefectures for valid id', () => {
        expect(getShuHireiBlockPrefectures('kinki')).toContain('osaka');
    });
    it('throws for unknown id', () => {
        expect(() => getShuHireiBlockPrefectures('unknown')).toThrow(
            'Item not found: unknown',
        );
    });
});

describe('getShuHireiBlockForPrefecture', () => {
    it('returns block for valid prefecture', () => {
        expect(getShuHireiBlockForPrefecture('osaka')).toMatchObject({
            id: 'kinki',
            name: '近畿',
        });
    });
    it('throws for unknown prefecture', () => {
        expect(() => getShuHireiBlockForPrefecture('unknown')).toThrow(
            'Item not found: unknown',
        );
    });
});
