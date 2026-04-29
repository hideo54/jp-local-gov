import { getOne } from '../../lib.js';
import type { PrefectureId } from '../../prefecture/index.js';
import type { ShuElection } from './elections.js';
import { shuElections } from './elections.js';
import type {
    ShuHireiBlock,
    ShuHireiBlockId,
    ShuHireiBlockName,
} from './hirei-block.js';
import { shuHireiBlockIds, shuHireiBlocks } from './hirei-block.js';

export const isShuHireiBlockId = (s: string): s is ShuHireiBlockId =>
    shuHireiBlockIds.some(id => id === s);

export const getShuHireiBlockName = (id: string): ShuHireiBlockName =>
    getOne(
        shuHireiBlocks.filter(b => b.id === id),
        id,
    ).name;

export const getShuHireiBlockId = (name: string): ShuHireiBlockId =>
    getOne(
        shuHireiBlocks.filter(b => b.name === name),
        name,
    ).id;

export const getShuHireiBlockPrefectures = (id: string): PrefectureId[] =>
    getOne(
        shuHireiBlocks.filter(b => b.id === id),
        id,
    ).prefectures;

export const getShuHireiBlockForPrefecture = (
    prefectureId: string,
): ShuHireiBlock =>
    getOne(
        shuHireiBlocks.filter(b => b.prefectures.some(p => p === prefectureId)),
        prefectureId,
    );

const getShuElection = (date: string): ShuElection => {
    const election = shuElections.filter(e => e.voteDate <= date).at(-1);
    if (!election) {
        throw new Error(`Date predates the current electoral system: ${date}`);
    }
    return election;
};

export const getShuDistrictCounts = (date: string) =>
    getShuElection(date).districtCounts;

export const getShuHireiBlockSeatCounts = (date: string) =>
    getShuElection(date).hireiSeatCounts;
