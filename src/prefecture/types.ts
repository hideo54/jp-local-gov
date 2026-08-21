import type { prefectureIds } from './data.js';

export type PrefectureId = (typeof prefectureIds)[number];

export interface PrefectureInfo {
    id: PrefectureId;
    name: string;
    shortName: string;
    website: string;
    adjacentPrefectureIds: readonly PrefectureId[];
}
