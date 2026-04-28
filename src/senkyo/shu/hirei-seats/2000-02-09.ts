import type { HireiBlockId } from '../hirei-block.js';

// 2000年2月9日施行
export const hireiBlockSeatCounts2000: { [key in HireiBlockId]: number } = {
    hokkaido: 8,
    tohoku: 14,
    kitakanto: 20,
    minamikanto: 21,
    tokyo: 17,
    hokurikushinetsu: 11,
    tokai: 21,
    kinki: 30,
    chugoku: 11,
    shikoku: 6,
    kyushu: 21,
};
