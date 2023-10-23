import dayjs from 'dayjs';
import type { PrefectureId } from './prefecture';

// 1994年施行
export const shuDistrictCounts1994: { [key in PrefectureId]: number } = {
    hokkaido: 13,
    aomori: 4,
    iwate: 4,
    miyagi: 6,
    akita: 3,
    yamagata: 4,
    fukushima: 5,
    ibaraki: 7,
    tochigi: 5,
    gunma: 5,
    saitama: 14,
    chiba: 14,
    tokyo: 25,
    kanagawa: 17,
    niigata: 6,
    toyama: 3,
    ishikawa: 3,
    fukui: 3,
    yamanashi: 3,
    nagano: 5,
    gifu: 5,
    shizuoka: 9,
    aichi: 15,
    mie: 5,
    shiga: 3,
    kyoto: 6,
    osaka: 19,
    hyogo: 12,
    nara: 4,
    wakayama: 3,
    tottori: 2,
    shimane: 3,
    okayama: 5,
    hiroshima: 7,
    yamaguchi: 4,
    tokushima: 3,
    kagawa: 3,
    ehime: 4,
    kochi: 3,
    fukuoka: 11,
    saga: 3,
    nagasaki: 4,
    kumamoto: 5,
    oita: 4,
    miyazaki: 3,
    kagoshima: 5,
    okinawa: 3,
};

// 2002年8月31日施行
export const shuDistrictCounts2002: { [key in PrefectureId]: number } = {
    hokkaido: 12, // 1減
    aomori: 4,
    iwate: 4,
    miyagi: 6,
    akita: 3,
    yamagata: 3, // 1減
    fukushima: 5,
    ibaraki: 7,
    tochigi: 5,
    gunma: 5,
    saitama: 15, // 1増
    chiba: 13, // 1増
    tokyo: 25,
    kanagawa: 18, // 1増
    niigata: 6,
    toyama: 3,
    ishikawa: 3,
    fukui: 3,
    yamanashi: 3,
    nagano: 5,
    gifu: 5,
    shizuoka: 8, // 1減
    aichi: 15,
    mie: 5,
    shiga: 4, // 1増
    kyoto: 6,
    osaka: 19,
    hyogo: 12,
    nara: 4,
    wakayama: 3,
    tottori: 2,
    shimane: 2, // 1減
    okayama: 5,
    hiroshima: 7,
    yamaguchi: 4,
    tokushima: 3,
    kagawa: 3,
    ehime: 4,
    kochi: 3,
    fukuoka: 11,
    saga: 3,
    nagasaki: 4,
    kumamoto: 5,
    oita: 3, // 1減
    miyazaki: 3,
    kagoshima: 5,
    okinawa: 4, // 1増
};

// 2013年7月28日施行
export const shuDistrictCounts2013: { [key in PrefectureId]: number } = {
    hokkaido: 12,
    aomori: 4,
    iwate: 4,
    miyagi: 6,
    akita: 3,
    yamagata: 3,
    fukushima: 5,
    ibaraki: 7,
    tochigi: 5,
    gunma: 5,
    saitama: 15,
    chiba: 13,
    tokyo: 25,
    kanagawa: 18,
    niigata: 6,
    toyama: 3,
    ishikawa: 3,
    fukui: 2, // 1減
    yamanashi: 2, // 1減
    nagano: 5,
    gifu: 5,
    shizuoka: 8,
    aichi: 15,
    mie: 5,
    shiga: 4,
    kyoto: 6,
    osaka: 19,
    hyogo: 12,
    nara: 4,
    wakayama: 3,
    tottori: 2,
    shimane: 2,
    okayama: 5,
    hiroshima: 7,
    yamaguchi: 4,
    tokushima: 2, // 1減
    kagawa: 3,
    ehime: 4,
    kochi: 2, // 1減
    fukuoka: 11,
    saga: 2, // 1減
    nagasaki: 4,
    kumamoto: 5,
    oita: 3,
    miyazaki: 3,
    kagoshima: 5,
    okinawa: 4,
};

// 2017年7月16日施行
export const shuDistrictCounts2017: { [key in PrefectureId]: number } = {
    hokkaido: 12,
    aomori: 3, // 1減
    iwate: 3, // 1減
    miyagi: 6,
    akita: 3,
    yamagata: 3,
    fukushima: 5,
    ibaraki: 7,
    tochigi: 5,
    gunma: 5,
    saitama: 15,
    chiba: 13,
    tokyo: 25,
    kanagawa: 18,
    niigata: 6,
    toyama: 3,
    ishikawa: 3,
    fukui: 2,
    yamanashi: 2,
    nagano: 5,
    gifu: 5,
    shizuoka: 8,
    aichi: 15,
    mie: 4, // 1減
    shiga: 4,
    kyoto: 6,
    osaka: 19,
    hyogo: 12,
    nara: 3, // 1減
    wakayama: 3,
    tottori: 2,
    shimane: 2,
    okayama: 5,
    hiroshima: 7,
    yamaguchi: 4,
    tokushima: 2,
    kagawa: 3,
    ehime: 4,
    kochi: 2,
    fukuoka: 11,
    saga: 2,
    nagasaki: 4,
    kumamoto: 4, // 1減
    oita: 3,
    miyazaki: 3,
    kagoshima: 4, // 1減
    okinawa: 4,
};

// 2022年12月28日施行
export const shuDistrictCounts2022: { [key in PrefectureId]: number } = {
    hokkaido: 12,
    aomori: 3,
    iwate: 3,
    miyagi: 5, // 1減
    akita: 3,
    yamagata: 3,
    fukushima: 4, // 1減
    ibaraki: 7,
    tochigi: 5,
    gunma: 5,
    saitama: 16, // 1増
    chiba: 14, // 1増
    tokyo: 30, // 5増
    kanagawa: 20, // 2増
    niigata: 5, // 1減
    toyama: 3,
    ishikawa: 3,
    fukui: 2,
    yamanashi: 2,
    nagano: 5,
    gifu: 5,
    shizuoka: 8,
    aichi: 16, // 1増
    mie: 4,
    shiga: 3, // 1減
    kyoto: 6,
    osaka: 19,
    hyogo: 12,
    nara: 3,
    wakayama: 2, // 1減
    tottori: 2,
    shimane: 2,
    okayama: 4, // 1減
    hiroshima: 6, // 1減
    yamaguchi: 3, // 1減
    tokushima: 2,
    kagawa: 3,
    ehime: 3, // 1減
    kochi: 2,
    fukuoka: 11,
    saga: 2,
    nagasaki: 3, // 1減
    kumamoto: 4,
    oita: 3,
    miyazaki: 3,
    kagoshima: 4,
    okinawa: 4,
};

export const getShuDistrictCounts = (date: string, sort: 'legally' | 'by-vote-day' = 'by-vote-day') => {
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

export const blockNames = {
    hokkaido: '北海道ブロック',
    tohoku: '東北ブロック',
    kitakanto: '北関東ブロック',
    minamikanto: '南関東ブロック',
    tokyo: '東京ブロック',
    hokurikushinetsu: '北陸信越ブロック',
    tokai: '東海ブロック',
    kinki: '近畿ブロック',
    chugoku: '中国ブロック',
    shikoku: '四国ブロック',
    kyushu: '九州ブロック',
} as const;

export type BlockId = keyof typeof blockNames;
export type BlockName = typeof blockNames[BlockId];

export const blockPrefectures: { [key in BlockId]: PrefectureId[] } = {
    hokkaido: ['hokkaido'],
    tohoku: ['aomori', 'iwate', 'miyagi', 'akita', 'yamagata', 'fukushima'],
    kitakanto: ['ibaraki', 'tochigi', 'gunma', 'saitama'],
    minamikanto: ['chiba', 'kanagawa', 'yamanashi'],
    tokyo: ['tokyo'],
    hokurikushinetsu: ['niigata', 'toyama', 'ishikawa', 'fukui', 'nagano'],
    tokai: ['gifu', 'shizuoka', 'aichi', 'mie'],
    kinki: ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'],
    chugoku: ['tottori', 'shimane', 'okayama', 'hiroshima', 'yamaguchi'],
    shikoku: ['tokushima', 'kagawa', 'ehime', 'kochi'],
    kyushu: ['fukuoka', 'saga', 'nagasaki', 'kumamoto', 'oita', 'miyazaki', 'kagoshima', 'okinawa'],
};

export const blockSeats2017: { [key in BlockId]: number } = {
    hokkaido: 8,
    tohoku: 13,
    kitakanto: 19,
    minamikanto: 22,
    tokyo: 17,
    hokurikushinetsu: 11,
    tokai: 21,
    kinki: 28,
    chugoku: 11,
    shikoku: 6,
    kyushu: 20,
};

export const blockSeats2022: { [key in BlockId]: number } = {
    hokkaido: 8,
    tohoku: 12, // 1減
    kitakanto: 19,
    minamikanto: 23, // 1増
    tokyo: 19, // 2増
    hokurikushinetsu: 10, // 1減
    tokai: 21,
    kinki: 28,
    chugoku: 10, // 1減
    shikoku: 6,
    kyushu: 20,
};
