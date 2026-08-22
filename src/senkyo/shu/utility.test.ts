import { describe, expect, it } from 'vitest';
import {
    compareShuDistrictIds,
    compareShuDistrictOrHireiBlockIds,
    fromShuHireiBlockIdWithPrefix,
    getShuDistrictCounts,
    getShuHireiBlockForPrefecture,
    getShuHireiBlockId,
    getShuHireiBlockName,
    getShuHireiBlockPrefectures,
    getShuHireiBlockSeatCounts,
    isShuDistrictId,
    isShuHireiBlockId,
    isShuHireiBlockIdWithPrefix,
    toShuHireiBlockIdWithPrefix,
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

describe('compareShuDistrictIds', () => {
    it('sorts by prefecture order, then by district number', () => {
        const unsorted = ['tokyo-10', 'hokkaido-1', 'tokyo-2', 'tokyo-1'];
        expect(unsorted.sort(compareShuDistrictIds)).toStrictEqual([
            'hokkaido-1',
            'tokyo-1',
            'tokyo-2',
            'tokyo-10',
        ]);
    });
    it('throws for an unknown prefecture', () => {
        expect(() => compareShuDistrictIds('unknown-1', 'tokyo-1')).toThrow(
            'Invalid shu district id: unknown-1',
        );
    });
    it('throws when the second argument is invalid', () => {
        expect(() => compareShuDistrictIds('tokyo-1', 'unknown-1')).toThrow(
            'Invalid shu district id: unknown-1',
        );
    });
    it('throws for a malformed id', () => {
        expect(() => compareShuDistrictIds('tokyo', 'tokyo-1')).toThrow(
            'Invalid shu district id: tokyo',
        );
        expect(() => compareShuDistrictIds('tokyo-01', 'tokyo-1')).toThrow(
            'Invalid shu district id: tokyo-01',
        );
        expect(() => compareShuDistrictIds('tokyo-1-2', 'tokyo-1')).toThrow(
            'Invalid shu district id: tokyo-1-2',
        );
    });
});

describe('isShuDistrictId', () => {
    it('returns true for an existing district at the given date', () => {
        expect(isShuDistrictId('tokyo-30', '2024-10-27')).toBe(true);
    });
    it('returns false for a district not existing at the given date', () => {
        // 東京30区は2022年の区割り改定で新設された
        expect(isShuDistrictId('tokyo-30', '2021-10-31')).toBe(false);
    });
    it('returns false for a malformed id', () => {
        expect(isShuDistrictId('tokyo', '2024-10-27')).toBe(false);
        expect(isShuDistrictId('unknown-1', '2024-10-27')).toBe(false);
    });
});

describe('isShuHireiBlockIdWithPrefix', () => {
    it('returns true for a prefixed id', () => {
        expect(isShuHireiBlockIdWithPrefix('hirei-kinki')).toBe(true);
    });
    it('returns false for an unprefixed id', () => {
        expect(isShuHireiBlockIdWithPrefix('kinki')).toBe(false);
    });
    it('returns false for an unknown block', () => {
        expect(isShuHireiBlockIdWithPrefix('hirei-unknown')).toBe(false);
    });
});

describe('toShuHireiBlockIdWithPrefix', () => {
    it('adds the prefix', () => {
        expect(toShuHireiBlockIdWithPrefix('kinki')).toStrictEqual(
            'hirei-kinki',
        );
    });
});

describe('fromShuHireiBlockIdWithPrefix', () => {
    it('removes the prefix', () => {
        expect(fromShuHireiBlockIdWithPrefix('hirei-kinki')).toStrictEqual(
            'kinki',
        );
    });
    it('throws for an unprefixed id', () => {
        expect(() => fromShuHireiBlockIdWithPrefix('kinki')).toThrow(
            'Invalid prefixed shu hirei block id: kinki',
        );
    });
});

describe('compareShuDistrictOrHireiBlockIds', () => {
    it('sorts districts before hirei blocks', () => {
        const unsorted = [
            'hirei-kinki',
            'tokyo-10',
            'hirei-hokkaido',
            'hokkaido-1',
            'tokyo-2',
        ];
        expect(unsorted.sort(compareShuDistrictOrHireiBlockIds)).toStrictEqual([
            'hokkaido-1',
            'tokyo-2',
            'tokyo-10',
            'hirei-hokkaido',
            'hirei-kinki',
        ]);
    });
    it('sorts hirei blocks in the order of 公職選挙法 別表2', () => {
        const unsorted = ['hirei-kyushu', 'hirei-tohoku', 'hirei-hokkaido'];
        expect(unsorted.sort(compareShuDistrictOrHireiBlockIds)).toStrictEqual([
            'hirei-hokkaido',
            'hirei-tohoku',
            'hirei-kyushu',
        ]);
    });
    it('throws for an unprefixed hirei block id', () => {
        expect(() =>
            compareShuDistrictOrHireiBlockIds('kinki', 'tokyo-1'),
        ).toThrow('Invalid shu district or hirei block id: kinki');
    });
    it('throws for an unknown id', () => {
        expect(() =>
            compareShuDistrictOrHireiBlockIds('tokyo-1', 'unknown-1'),
        ).toThrow('Invalid shu district or hirei block id: unknown-1');
        expect(() =>
            compareShuDistrictOrHireiBlockIds('hirei-kinki', 'hirei-unknown'),
        ).toThrow('Invalid shu district or hirei block id: hirei-unknown');
    });
});
