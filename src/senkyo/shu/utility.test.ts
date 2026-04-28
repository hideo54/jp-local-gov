import { describe, expect, it } from 'vitest';
import { getShuDistrictCounts } from './utility.js';

describe('getShuDistrictCounts', () => {
    it('Returns correct counts', () => {
        expect(getShuDistrictCounts('2023-10-22').tokyo).toStrictEqual(25);
        expect(
            getShuDistrictCounts('2023-10-22', 'legally').tokyo,
        ).toStrictEqual(30);
    });
});
