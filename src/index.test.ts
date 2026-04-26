import { describe, expect, it } from 'vitest';
import * as senkyo from './senkyo.js';

describe('getShuDistrictCounts', () => {
    it('Returns correct counts', () => {
        expect(senkyo.getShuDistrictCounts('2023-10-22').tokyo).toStrictEqual(
            25,
        );
        expect(
            senkyo.getShuDistrictCounts('2023-10-22', 'legally').tokyo,
        ).toStrictEqual(30);
    });
});
