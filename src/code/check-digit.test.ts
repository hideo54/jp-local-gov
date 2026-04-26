import { describe, expect, it } from 'vitest';
import { calculateCheckDigit, hasValidCheckDigit } from './check-digit.js';

describe('calculateCheckDigit', () => {
    it('calculates correct check digit for prefecture code', () => {
        expect(calculateCheckDigit('27000')).toBe(8); // 大阪府: 270008
    });
    it('calculates correct check digit for municipality code', () => {
        expect(calculateCheckDigit('27100')).toBe(4); // 大阪市: 271004
    });
    it('throws for 6-digit input', () => {
        expect(() => calculateCheckDigit('271021')).toThrow();
    });
    it('throws for non-numeric input', () => {
        expect(() => calculateCheckDigit('abcde')).toThrow();
    });
});

describe('hasValidCheckDigit', () => {
    it('returns true for valid codes', () => {
        expect(hasValidCheckDigit('270008')).toBe(true); // 大阪府
        expect(hasValidCheckDigit('271004')).toBe(true); // 大阪市
        expect(hasValidCheckDigit('271021')).toBe(true); // 大阪市都島区
    });
    it('returns false for wrong check digit', () => {
        expect(hasValidCheckDigit('270009')).toBe(false);
    });
    it('returns false for 5-digit input', () => {
        expect(hasValidCheckDigit('27102')).toBe(false);
    });
    it('returns false for non-numeric input', () => {
        expect(hasValidCheckDigit('abc123')).toBe(false);
    });
});
