import { describe, expect, it } from 'vitest';
import { getShuDistrictCounts } from './utility.js';

describe('getShuDistrictCounts', () => {
    it('Returns correct counts', () => {
        // 第49回 (2021-10-31) の区割り
        expect(getShuDistrictCounts('2021-10-31').tokyo).toStrictEqual(25);
        // 第50回 (2024-10-27) の区割り
        expect(getShuDistrictCounts('2024-10-27').tokyo).toStrictEqual(30);
    });
});
