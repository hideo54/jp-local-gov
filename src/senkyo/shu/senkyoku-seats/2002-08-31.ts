import type { PrefectureId } from '../../../prefecture/index.js';

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
