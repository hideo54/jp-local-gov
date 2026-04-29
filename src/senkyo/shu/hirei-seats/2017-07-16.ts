import type { ShuHireiBlockId } from '../hirei-block.js';

export const shuHireiBlockSeatCounts2017: { [key in ShuHireiBlockId]: number } =
    {
        hokkaido: 8,
        tohoku: 13, // 1減
        kitakanto: 19, // 1減
        minamikanto: 22,
        tokyo: 17,
        hokurikushinetsu: 11,
        tokai: 21,
        kinki: 28, // 1減
        chugoku: 11,
        shikoku: 6,
        kyushu: 20, // 1減
    };
