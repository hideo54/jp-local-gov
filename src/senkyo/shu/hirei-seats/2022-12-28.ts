import type { ShuHireiBlockId } from '../hirei-block.js';

// 2022年12月28日施行
export const shuHireiBlockSeatCounts2022: { [key in ShuHireiBlockId]: number } =
    {
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
