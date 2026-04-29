import type { ShuHireiBlockId } from '../hirei-block.js';

// 1994年3月4日施行
export const shuHireiBlockSeatCounts1994: { [key in ShuHireiBlockId]: number } =
    {
        hokkaido: 9,
        tohoku: 16,
        kitakanto: 21,
        minamikanto: 23,
        tokyo: 19,
        hokurikushinetsu: 13,
        tokai: 23,
        kinki: 33,
        chugoku: 13,
        shikoku: 7,
        kyushu: 23,
    };
