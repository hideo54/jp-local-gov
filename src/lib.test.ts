import { describe, expect, it } from 'vitest';
import { getOne } from './lib.js';

describe('getOne', () => {
    it('returns the single item', () => {
        expect(getOne([54], '54')).toBe(54);
    });
    it('throws when empty', () => {
        expect(() => getOne([], 'x')).toThrow('Item not found: x');
    });
    it('throws when multiple', () => {
        expect(() => getOne([1, 2], 'x')).toThrow('Multiple items found: x');
    });
});
