import { describe, expect, it } from 'vitest';
import { getPrefectureInfoById, getPrefectureInfoByName } from './lookup.js';

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
