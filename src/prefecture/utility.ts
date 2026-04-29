import { getOne } from '../lib.js';
import { prefectureInfos } from './data.js';
import type { PrefectureId, PrefectureInfo } from './types.js';

export const isPrefectureId = (s: string): s is PrefectureId =>
    prefectureInfos.some(p => p.id === s);

export const comparePrefectureIds = (
    a: PrefectureId,
    b: PrefectureId,
): number =>
    prefectureInfos.findIndex(p => p.id === a) -
    prefectureInfos.findIndex(p => p.id === b);

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
