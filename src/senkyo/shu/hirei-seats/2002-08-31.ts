import type { HireiBlockId } from '../hirei-block.js';

// 2002年8月31日施行
export const hireiBlockSeatCounts2002: { [key in HireiBlockId]: number } = {
    hokkaido: 8,
    tohoku: 14,
    kitakanto: 20,
    minamikanto: 22, // 1増
    tokyo: 17,
    hokurikushinetsu: 11,
    tokai: 21,
    kinki: 29, // 1減
    chugoku: 11,
    shikoku: 6,
    kyushu: 21,
};
