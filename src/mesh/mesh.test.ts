import { describe, expect, it } from 'vitest';
import { coordinateToMeshCode } from './mesh.js';

describe('coordinateToMeshCode', () => {
    it('throws for coordinate outside Japan', () => {
        expect(() => coordinateToMeshCode([0, 0], '1km')).toThrow(
            'Given coordinate is outside Japan.',
        );
    });

    it('accepts [lon, lat] order as well as [lat, lon]', () => {
        const latLon: [number, number] = [
            35.67548558730212, 139.74258942903984,
        ];
        const lonLat: [number, number] = [
            139.74258942903984, 35.67548558730212,
        ];
        expect(coordinateToMeshCode(latLon, 'JIS-3')).toEqual(
            coordinateToMeshCode(lonLat, 'JIS-3'),
        );
    });

    // https://www.arcgis.com/apps/instant/lookup/index.html?appid=ec8abf80f76c4417b01561e303ed2d32
    const coordinate: [number, number] = [
        35.67548558730212, 139.74258942903984,
    ];

    it('returns correct JIS-1 (80km) mesh code', () => {
        expect(coordinateToMeshCode(coordinate, 'JIS-1')).toEqual('5339');
    });

    it('returns correct JIS-2 (10km) mesh code', () => {
        expect(coordinateToMeshCode(coordinate, 'JIS-2')).toEqual('533945');
    });

    it('returns correct JIS-3 (1km) mesh code', () => {
        expect(coordinateToMeshCode(coordinate, 'JIS-3')).toEqual('53394519');
    });

    it('returns correct 5km mesh code', () => {
        expect(coordinateToMeshCode(coordinate, '5km')).toEqual('5339452');
    });

    it('returns correct 2km mesh code', () => {
        // https://www.geosense.co.jp/map/tool/geoconverter.php
        expect(coordinateToMeshCode(coordinate, '2km')).toEqual('533945085');
    });

    it('returns correct 500m mesh code', () => {
        expect(coordinateToMeshCode(coordinate, '500m')).toEqual('533945191');
    });

    it('returns correct 250m mesh code', () => {
        // https://www.zenrin.co.jp/product/article/map-mesh/index.html
        expect(
            coordinateToMeshCode(
                [35.67258429819781, 139.75400437702388],
                'JIS-3-1/4',
            ),
        ).toEqual('5339460032');
    });

    it('returns correct 125m mesh code', () => {
        // https://netfuku-yaro.com/2021/02/07/post-1046/
        expect(
            coordinateToMeshCode([35.68945, 139.691774], 'JIS-3-1/8'),
        ).toEqual('53394525323');
    });

    it('returns correct 100m mesh code', () => {
        // https://home.csis.u-tokyo.ac.jp/~nishizawa/teikyo/chiiki_mesh.pdf
        expect(coordinateToMeshCode([35.664742, 139.403086], '100m')).toEqual(
            '5339339272',
        );
    });
});
