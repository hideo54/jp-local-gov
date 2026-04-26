import { describe, expect, it } from 'vitest';
import * as mesh from './mesh.js';
import * as prefecture from './prefecture.js';
import * as senkyo from './senkyo.js';

describe('coordinateToMeshCode', () => {
    it('Returns correct mesh code', () => {
        // https://www.arcgis.com/apps/instant/lookup/index.html?appid=ec8abf80f76c4417b01561e303ed2d32
        expect(
            mesh.coordinateToMeshCode(
                [35.67548558730212, 139.74258942903984],
                '4',
            ),
        ).toEqual('533945191');
        expect(
            mesh.coordinateToMeshCode(
                [
                    // 緯度経度逆でも OK
                    139.74258942903984, 35.67548558730212,
                ],
                '4',
            ),
        ).toEqual('533945191');

        // https://www.zenrin.co.jp/product/article/map-mesh/index.html
        expect(
            mesh.coordinateToMeshCode(
                [35.67258429819781, 139.75400437702388],
                'JIS-3-1/4',
            ),
        ).toEqual('5339460032');

        // https://netfuku-yaro.com/2021/02/07/post-1046/
        expect(
            mesh.coordinateToMeshCode([35.68945, 139.691774], 'JIS-3-1/8'),
        ).toEqual('53394525323');

        // https://home.csis.u-tokyo.ac.jp/~nishizawa/teikyo/chiiki_mesh.pdf
        expect(
            mesh.coordinateToMeshCode([35.664742, 139.403086], '100m'),
        ).toEqual('5339339272');
    });
});

describe('getPrefectureName', () => {
    it('Returns correct name', () => {
        expect(prefecture.getPrefectureName('osaka')).toEqual('大阪府');
    });
});

describe('getPrefectureId', () => {
    it('Returns correct id', () => {
        expect(prefecture.getPrefectureId('大阪府')).toEqual('osaka');
        expect(prefecture.getPrefectureId('京都')).toEqual('kyoto');
    });
});

describe('getShuDistrictCounts', () => {
    it('Returns correct counts', () => {
        expect(senkyo.getShuDistrictCounts('2023-10-22').tokyo).toStrictEqual(
            25,
        );
        expect(
            senkyo.getShuDistrictCounts('2023-10-22', 'legally').tokyo,
        ).toStrictEqual(30);
    });
});
