import type { PrefectureId } from '../../prefecture/index.js';

export const hireiBlockIds = [
    'hokkaido',
    'tohoku',
    'kitakanto',
    'minamikanto',
    'tokyo',
    'hokurikushinetsu',
    'tokai',
    'kinki',
    'chugoku',
    'shikoku',
    'kyushu',
] as const;

export const hireiBlockNames = [
    '北海道',
    '東北',
    '北関東',
    '南関東',
    '東京',
    '北陸信越',
    '東海',
    '近畿',
    '中国',
    '四国',
    '九州',
] as const;

export type HireiBlockId = (typeof hireiBlockIds)[number];
export type HireiBlockName = (typeof hireiBlockNames)[number];

// 公職選挙法 別表2 に拠る。
export const hireiBlockPrefectures: { [key in HireiBlockId]: PrefectureId[] } =
    {
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
        kyushu: [
            'fukuoka',
            'saga',
            'nagasaki',
            'kumamoto',
            'oita',
            'miyazaki',
            'kagoshima',
            'okinawa',
        ],
    };
