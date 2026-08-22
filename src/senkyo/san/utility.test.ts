import { describe, expect, it } from 'vitest';
import {
    compareSanDistrictIds,
    compareSanDistrictIdsAt,
    getSanDistrictName,
    getSanDistrictSeats,
} from './utility.js';

describe('compareSanDistrictIdsAt', () => {
    it('sorts districts in defined order', () => {
        const unsorted = ['okinawa', 'hokkaido', 'tokyo'];
        expect(
            unsorted.sort(compareSanDistrictIdsAt('2016-07-10')),
        ).toStrictEqual(['hokkaido', 'tokyo', 'okinawa']);
    });
    it('throws for date predating the district system', () => {
        expect(() =>
            ['hokkaido', 'tokyo'].sort(compareSanDistrictIdsAt('2015-01-01')),
        ).toThrow('Date predates the current san district system: 2015-01-01');
    });
});

describe('getSanDistrictName', () => {
    it('returns name for valid id', () => {
        expect(getSanDistrictName('tokyo', '2016-07-10')).toStrictEqual(
            '東京都',
        );
    });
    it('returns name for 合区 district', () => {
        expect(
            getSanDistrictName('tottori-shimane', '2016-07-10'),
        ).toStrictEqual('鳥取県・島根県');
    });
    it('throws for unknown id', () => {
        expect(() => getSanDistrictName('unknown', '2016-07-10')).toThrow(
            'Item not found: unknown',
        );
    });
    it('throws for date predating the district system', () => {
        expect(() => getSanDistrictName('tokyo', '2015-01-01')).toThrow(
            'Date predates the current san district system: 2015-01-01',
        );
    });
});

describe('getSanDistrictSeats', () => {
    it('returns seats for valid id', () => {
        expect(getSanDistrictSeats('tokyo', '2016-07-10')).toStrictEqual(6);
    });
    it('throws for unknown id', () => {
        expect(() => getSanDistrictSeats('unknown', '2016-07-10')).toThrow(
            'Item not found: unknown',
        );
    });
    it('throws for date predating the district system', () => {
        expect(() => getSanDistrictSeats('tokyo', '2015-01-01')).toThrow(
            'Date predates the current san district system: 2015-01-01',
        );
    });
});

describe('compareSanDistrictIds', () => {
    it('works as a comparator passed directly to sort', () => {
        expect(
            ['okinawa', 'hokkaido', 'tokyo'].sort(compareSanDistrictIds),
        ).toStrictEqual(['hokkaido', 'tokyo', 'okinawa']);
    });
    it('compares two ids directly', () => {
        expect(compareSanDistrictIds('okinawa', 'hokkaido')).toBeGreaterThan(0);
        expect(compareSanDistrictIds('hokkaido', 'okinawa')).toBeLessThan(0);
        expect(compareSanDistrictIds('tokyo', 'tokyo')).toStrictEqual(0);
    });
});

describe('compareSanDistrictIdsAt without date', () => {
    it('uses the latest district system', () => {
        expect(
            ['okinawa', 'hokkaido', 'tokyo'].sort(compareSanDistrictIdsAt()),
        ).toStrictEqual(['hokkaido', 'tokyo', 'okinawa']);
    });
});

describe('getSanDistrictName without date', () => {
    it('uses the latest district system', () => {
        expect(getSanDistrictName('tottori-shimane')).toStrictEqual(
            '鳥取県・島根県',
        );
    });
    it('throws for unknown id', () => {
        expect(() => getSanDistrictName('unknown')).toThrow(
            'Item not found: unknown',
        );
    });
});

describe('getSanDistrictSeats without date', () => {
    it('uses the latest district system', () => {
        expect(getSanDistrictSeats('tokyo')).toStrictEqual(6);
    });
    it('throws for unknown id', () => {
        expect(() => getSanDistrictSeats('unknown')).toThrow(
            'Item not found: unknown',
        );
    });
});
