import type { PrefectureId } from '../../prefecture/index.js';
import type { ShuHireiBlockId } from './hirei-block.js';
import { shuHireiBlockSeatCounts1994 } from './hirei-seats/1994-03-04.js';
import { shuHireiBlockSeatCounts2000 } from './hirei-seats/2000-02-09.js';
import { shuHireiBlockSeatCounts2002 } from './hirei-seats/2002-08-31.js';
import { shuHireiBlockSeatCounts2017 } from './hirei-seats/2017-07-16.js';
import { shuHireiBlockSeatCounts2022 } from './hirei-seats/2022-12-28.js';
import { shuDistrictCounts1994 } from './senkyoku-seats/1994-03-04.js';
import { shuDistrictCounts2002 } from './senkyoku-seats/2002-08-31.js';
import { shuDistrictCounts2013 } from './senkyoku-seats/2013-07-28.js';
import { shuDistrictCounts2017 } from './senkyoku-seats/2017-07-16.js';
import { shuDistrictCounts2022 } from './senkyoku-seats/2022-12-28.js';

export interface ShuElection {
    number: number;
    voteDate: string;
    districtCounts: { [key in PrefectureId]: number };
    hireiSeatCounts: { [key in ShuHireiBlockId]: number };
}

export const shuElections: readonly ShuElection[] = [
    {
        number: 41,
        voteDate: '1996-10-20',
        districtCounts: shuDistrictCounts1994,
        hireiSeatCounts: shuHireiBlockSeatCounts1994,
    },
    {
        number: 42,
        voteDate: '2000-06-25',
        districtCounts: shuDistrictCounts1994,
        hireiSeatCounts: shuHireiBlockSeatCounts2000,
    },
    {
        number: 43,
        voteDate: '2003-11-09',
        districtCounts: shuDistrictCounts2002,
        hireiSeatCounts: shuHireiBlockSeatCounts2002,
    },
    {
        number: 44,
        voteDate: '2005-09-11',
        districtCounts: shuDistrictCounts2002,
        hireiSeatCounts: shuHireiBlockSeatCounts2002,
    },
    {
        number: 45,
        voteDate: '2009-08-30',
        districtCounts: shuDistrictCounts2002,
        hireiSeatCounts: shuHireiBlockSeatCounts2002,
    },
    {
        number: 46,
        voteDate: '2012-12-16',
        districtCounts: shuDistrictCounts2002,
        hireiSeatCounts: shuHireiBlockSeatCounts2002,
    },
    {
        number: 47,
        voteDate: '2014-12-14',
        districtCounts: shuDistrictCounts2013,
        hireiSeatCounts: shuHireiBlockSeatCounts2002,
    },
    {
        number: 48,
        voteDate: '2017-10-22',
        districtCounts: shuDistrictCounts2017,
        hireiSeatCounts: shuHireiBlockSeatCounts2017,
    },
    {
        number: 49,
        voteDate: '2021-10-31',
        districtCounts: shuDistrictCounts2017,
        hireiSeatCounts: shuHireiBlockSeatCounts2017,
    },
    {
        number: 50,
        voteDate: '2024-10-27',
        districtCounts: shuDistrictCounts2022,
        hireiSeatCounts: shuHireiBlockSeatCounts2022,
    },
    {
        number: 51,
        voteDate: '2026-02-08',
        districtCounts: shuDistrictCounts2022,
        hireiSeatCounts: shuHireiBlockSeatCounts2022,
    },
];
