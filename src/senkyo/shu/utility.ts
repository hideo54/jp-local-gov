import { getOne } from '../../lib.js';
import type { PrefectureId } from '../../prefecture/index.js';
import {
    comparePrefectureIds,
    isPrefectureId,
} from '../../prefecture/index.js';
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

export const getShuHireiBlockPrefectures = (
    id: string,
): readonly PrefectureId[] =>
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
    const election = shuElections.findLast(e => e.voteDate <= date);
    if (!election) {
        throw new Error(`Date predates the current electoral system: ${date}`);
    }
    return election;
};

export const getShuDistrictCounts = (date: string) =>
    getShuElection(date).districtCounts;

export const getShuHireiBlockSeatCounts = (date: string) =>
    getShuElection(date).hireiSeatCounts;

export type ShuDistrictId = `${PrefectureId}-${number}`;

interface ParsedShuDistrictId {
    prefectureId: PrefectureId;
    number: number;
}

const parseShuDistrictId = (id: string): ParsedShuDistrictId | null => {
    const [prefectureId, number, ...rest] = id.split('-');
    if (
        rest.length > 0 ||
        !isPrefectureId(prefectureId) ||
        !/^[1-9][0-9]*$/.test(number ?? '')
    ) {
        return null;
    }
    return { prefectureId, number: Number(number) };
};

export const isShuDistrictId = (
    s: string,
    date: string,
): s is ShuDistrictId => {
    const parsed = parseShuDistrictId(s);
    if (parsed === null) return false;
    return parsed.number <= getShuDistrictCounts(date)[parsed.prefectureId];
};

export const compareShuDistrictIds = (a: string, b: string): number => {
    const parsedA = parseShuDistrictId(a);
    const parsedB = parseShuDistrictId(b);
    if (parsedA === null) throw new Error(`Invalid shu district id: ${a}`);
    if (parsedB === null) throw new Error(`Invalid shu district id: ${b}`);
    return (
        comparePrefectureIds(parsedA.prefectureId, parsedB.prefectureId) ||
        parsedA.number - parsedB.number
    );
};

export type ShuHireiBlockIdWithPrefix = `hirei-${ShuHireiBlockId}`;

export type ShuDistrictOrHireiBlockId =
    | ShuDistrictId
    | ShuHireiBlockIdWithPrefix;

export const isShuHireiBlockIdWithPrefix = (
    s: string,
): s is ShuHireiBlockIdWithPrefix =>
    s.startsWith('hirei-') && isShuHireiBlockId(s.slice('hirei-'.length));

export const toShuHireiBlockIdWithPrefix = (
    id: ShuHireiBlockId,
): ShuHireiBlockIdWithPrefix => `hirei-${id}`;

export const fromShuHireiBlockIdWithPrefix = (s: string): ShuHireiBlockId => {
    if (!isShuHireiBlockIdWithPrefix(s)) {
        throw new Error(`Invalid prefixed shu hirei block id: ${s}`);
    }
    return s.slice('hirei-'.length) as ShuHireiBlockId;
};

export const compareShuDistrictOrHireiBlockIds = (
    a: string,
    b: string,
): number => {
    const parsedA = parseShuDistrictId(a);
    const parsedB = parseShuDistrictId(b);
    if (parsedA !== null && parsedB !== null) {
        return (
            comparePrefectureIds(parsedA.prefectureId, parsedB.prefectureId) ||
            parsedA.number - parsedB.number
        );
    }
    const hireiA = isShuHireiBlockIdWithPrefix(a);
    const hireiB = isShuHireiBlockIdWithPrefix(b);
    if (parsedA === null && !hireiA) {
        throw new Error(`Invalid shu district or hirei block id: ${a}`);
    }
    if (parsedB === null && !hireiB) {
        throw new Error(`Invalid shu district or hirei block id: ${b}`);
    }
    if (!hireiA) return -1;
    if (!hireiB) return 1;
    return (
        shuHireiBlockIds.indexOf(fromShuHireiBlockIdWithPrefix(a)) -
        shuHireiBlockIds.indexOf(fromShuHireiBlockIdWithPrefix(b))
    );
};
