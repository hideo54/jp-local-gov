import { getOne } from '../lib.js';
import { prefectureIds, prefectureInfos } from './data.js';
import type { PrefectureId, PrefectureInfo } from './types.js';

export const isPrefectureId = (s: string): s is PrefectureId =>
    prefectureIds.some(id => id === s);

export const comparePrefectureIds = (
    a: PrefectureId,
    b: PrefectureId,
): number => prefectureIds.indexOf(a) - prefectureIds.indexOf(b);

export const getPrefectureInfoById = (id: string): PrefectureInfo =>
    getOne(
        prefectureInfos.filter(p => p.id === id),
        id,
    );

export const getPrefectureInfoByName = (name: string): PrefectureInfo =>
    getOne(
        prefectureInfos.filter(p => p.name === name || p.shortName === name),
        name,
    );
