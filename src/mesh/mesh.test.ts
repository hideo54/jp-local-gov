import { describe, expect, it } from 'vitest';
import { coordinateToMeshCode } from './mesh.js';

describe('coordinateToMeshCode', () => {
    it('Returns correct mesh code', () => {
        // https://www.arcgis.com/apps/instant/lookup/index.html?appid=ec8abf80f76c4417b01561e303ed2d32
        expect(
            coordinateToMeshCode([35.67548558730212, 139.74258942903984], '4'),
        ).toEqual('533945191');
        expect(
            coordinateToMeshCode(
                [
                    // 緯度経度逆でも OK
                    139.74258942903984, 35.67548558730212,
                ],
                '4',
            ),
        ).toEqual('533945191');

        // https://www.zenrin.co.jp/product/article/map-mesh/index.html
        expect(
            coordinateToMeshCode(
                [35.67258429819781, 139.75400437702388],
                'JIS-3-1/4',
            ),
        ).toEqual('5339460032');

        // https://netfuku-yaro.com/2021/02/07/post-1046/
        expect(
            coordinateToMeshCode([35.68945, 139.691774], 'JIS-3-1/8'),
        ).toEqual('53394525323');

        // https://home.csis.u-tokyo.ac.jp/~nishizawa/teikyo/chiiki_mesh.pdf
        expect(coordinateToMeshCode([35.664742, 139.403086], '100m')).toEqual(
            '5339339272',
        );
    });
});
