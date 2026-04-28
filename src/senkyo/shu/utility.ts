import dayjs from 'dayjs';
import type { PrefectureId } from '../../prefecture/index.js';
import {
    type HireiBlockId,
    type HireiBlockName,
    hireiBlockIds,
    hireiBlockNames,
    hireiBlockPrefectures,
} from './hirei-block.js';
import { hireiBlockSeatCounts1994 } from './hirei-seats/1994-03-04.js';
import { hireiBlockSeatCounts2000 } from './hirei-seats/2000-02-09.js';
import { hireiBlockSeatCounts2002 } from './hirei-seats/2002-08-31.js';
import { hireiBlockSeatCounts2017 } from './hirei-seats/2017-07-16.js';
import { hireiBlockSeatCounts2022 } from './hirei-seats/2022-12-28.js';
import { shuDistrictCounts1994 } from './senkyoku-seats/1994-03-04.js';
import { shuDistrictCounts2002 } from './senkyoku-seats/2002-08-31.js';
import { shuDistrictCounts2013 } from './senkyoku-seats/2013-07-28.js';
import { shuDistrictCounts2017 } from './senkyoku-seats/2017-07-16.js';
import { shuDistrictCounts2022 } from './senkyoku-seats/2022-12-28.js';

export const getShuDistrictCounts = (
    date: string,
    sort: 'legally' | 'by-vote-day' = 'by-vote-day',
) => {
    const day = dayjs(date);
    if (sort === 'legally') {
        if (day.isBefore('2002-08-31')) return shuDistrictCounts1994;
        if (day.isBefore('2013-07-28')) return shuDistrictCounts2002;
        if (day.isBefore('2017-07-16')) return shuDistrictCounts2013;
        if (day.isBefore('2022-12-28')) return shuDistrictCounts2017;
        return shuDistrictCounts2022;
    }
    // 第41回: 1996年 9月27日解散 10月20日投開票
    // 第42回: 2000年 6月 2日解散  6月25日投開票
    if (day.isBefore('2003-10-10')) return shuDistrictCounts1994;
    // 第43回: 2003年10月10日解散 11月9日投開票
    // 第44回: 2005年 8月 8日解散  9月11日投開票
    // 第45回: 2009年 7月21日解散  8月30日投開票
    // 第46回: 2012年11月16日解散 12月16日投開票
    if (day.isBefore('2014-11-21')) return shuDistrictCounts2002;
    // 第47回: 2014年11月21日解散 12月14日投開票
    if (day.isBefore('2017-09-28')) return shuDistrictCounts2013;
    // 第48回: 2017年 9月28日解散 10月22日投開票
    return shuDistrictCounts2017;
    // 第49回: 2021年10月14日解散 10月31日投開票
};

export const getHireiBlockName = (id: string): HireiBlockName => {
    const i = (hireiBlockIds as readonly string[]).indexOf(id);
    if (i === -1) throw new Error(`Item not found: ${id}`);
    return hireiBlockNames[i];
};

export const getHireiBlockId = (name: string): HireiBlockId => {
    const i = (hireiBlockNames as readonly string[]).indexOf(name);
    if (i === -1) throw new Error(`Item not found: ${name}`);
    return hireiBlockIds[i];
};

export const getHireiBlockPrefectures = (id: string): PrefectureId[] => {
    const i = (hireiBlockIds as readonly string[]).indexOf(id);
    if (i === -1) throw new Error(`Item not found: ${id}`);
    return hireiBlockPrefectures[hireiBlockIds[i]];
};

export const getShuHireiBlockSeatCounts = (
    date: string,
    sort: 'legally' | 'by-vote-day' = 'by-vote-day',
) => {
    const day = dayjs(date);
    if (sort === 'legally') {
        if (day.isBefore('2000-02-09')) return hireiBlockSeatCounts1994;
        if (day.isBefore('2002-08-31')) return hireiBlockSeatCounts2000;
        if (day.isBefore('2017-07-16')) return hireiBlockSeatCounts2002;
        if (day.isBefore('2022-12-28')) return hireiBlockSeatCounts2017;
        return hireiBlockSeatCounts2022;
    }
    // 第41回: 1996年 9月27日解散 10月20日投開票
    if (day.isBefore('2000-06-02')) return hireiBlockSeatCounts1994;
    // 第42回: 2000年 6月 2日解散  6月25日投開票
    if (day.isBefore('2003-10-10')) return hireiBlockSeatCounts2000;
    // 第43回: 2003年10月10日解散 11月9日投開票
    // 第44回: 2005年 8月 8日解散  9月11日投開票
    // 第45回: 2009年 7月21日解散  8月30日投開票
    // 第46回: 2012年11月16日解散 12月16日投開票
    // 第47回: 2014年11月21日解散 12月14日投開票
    if (day.isBefore('2017-09-28')) return hireiBlockSeatCounts2002;
    // 第48回: 2017年 9月28日解散 10月22日投開票
    if (day.isBefore('2021-10-14')) return hireiBlockSeatCounts2017;
    // 第49回: 2021年10月14日解散 10月31日投開票
    // 第50回: 2024年10月9日解散 10月27日投開票
    // 第51回: 2026年1月23日解散 2月8日投開票
    return hireiBlockSeatCounts2022;
};
