import type { PrefectureId } from '../../../prefecture/index.js';

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
