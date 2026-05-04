import type { PrefectureId } from '../../prefecture/index.js';

export const shuHireiBlockIds = [
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

export type ShuHireiBlockId = (typeof shuHireiBlockIds)[number];

export type ShuHireiBlockName =
    | '北海道'
    | '東北'
    | '北関東'
    | '南関東'
    | '東京'
    | '北陸信越'
    | '東海'
    | '近畿'
    | '中国'
    | '四国'
    | '九州';

export interface ShuHireiBlock {
    id: ShuHireiBlockId;
    name: ShuHireiBlockName;
    prefectures: readonly PrefectureId[];
}

// 公職選挙法 別表2 に拠る。
export const shuHireiBlocks: readonly ShuHireiBlock[] = [
    { id: 'hokkaido', name: '北海道', prefectures: ['hokkaido'] },
    {
        id: 'tohoku',
        name: '東北',
        prefectures: [
            'aomori',
            'iwate',
            'miyagi',
            'akita',
            'yamagata',
            'fukushima',
        ],
    },
    {
        id: 'kitakanto',
        name: '北関東',
        prefectures: ['ibaraki', 'tochigi', 'gunma', 'saitama'],
    },
    {
        id: 'minamikanto',
        name: '南関東',
        prefectures: ['chiba', 'kanagawa', 'yamanashi'],
    },
    { id: 'tokyo', name: '東京', prefectures: ['tokyo'] },
    {
        id: 'hokurikushinetsu',
        name: '北陸信越',
        prefectures: ['niigata', 'toyama', 'ishikawa', 'fukui', 'nagano'],
    },
    {
        id: 'tokai',
        name: '東海',
        prefectures: ['gifu', 'shizuoka', 'aichi', 'mie'],
    },
    {
        id: 'kinki',
        name: '近畿',
        prefectures: ['shiga', 'kyoto', 'osaka', 'hyogo', 'nara', 'wakayama'],
    },
    {
        id: 'chugoku',
        name: '中国',
        prefectures: [
            'tottori',
            'shimane',
            'okayama',
            'hiroshima',
            'yamaguchi',
        ],
    },
    {
        id: 'shikoku',
        name: '四国',
        prefectures: ['tokushima', 'kagawa', 'ehime', 'kochi'],
    },
    {
        id: 'kyushu',
        name: '九州',
        prefectures: [
            'fukuoka',
            'saga',
            'nagasaki',
            'kumamoto',
            'oita',
            'miyazaki',
            'kagoshima',
            'okinawa',
        ],
    },
];
