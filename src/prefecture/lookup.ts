import { getOne } from '../lib.js';
import { prefectureInfos } from './data.js';
import type { PrefectureInfo } from './types.js';

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
