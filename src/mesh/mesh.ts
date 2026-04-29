const minimumLatitude = 24;
const maximumLatitude = 46;
const minimumLongitude = 122;
const maximumLongitude = 149;

export type MeshResolution =
    | 'JIS-1' // JISX0410:2002 により定められている「第1次地域区画」(約 80 km)
    | 'JIS-2' // 「第2次地域区画」(約 10 km)
    | 'JIS-3-x10' // 統合地域メッシュ「10倍地域メッシュ」(約 10 km)。'JIS-2' と同様。
    | 'JIS-3-x5' // 統合地域メッシュ「5倍地域メッシュ」(約 5 km)
    | 'JIS-3-x2' // 統合地域メッシュ「2倍地域メッシュ」(約 2 km)
    | 'JIS-3' // 「第3次地域区画」(約 1 km)。「基準地域メッシュコード」。
    | 'JIS-3-1/2' // 分割地域メッシュ「2分の1地域メッシュ」(約 500 m)
    | 'JIS-3-1/4' // 分割地域メッシュ「4分の1地域メッシュ」(約 250 m)
    | 'JIS-3-1/8' // 分割地域メッシュ「8分の1地域メッシュ」(約 125 m)
    | '1' // 1次メッシュコード
    | '2' // 2次メッシュコード
    | '3' // 3次メッシュコード
    | '4' // 4次メッシュコード
    | '5' // 5次メッシュコード
    | '80km'
    | '10km'
    | '5km'
    | '2km'
    | '1km'
    | '500m'
    | '250m'
    | '125m'
    | '100m';

export const coordinateToMeshCode = (
    coordinate: [number, number],
    resolution: MeshResolution,
): string => {
    let latitude: number, longitude: number;

    if (
        minimumLatitude <= coordinate[0] &&
        coordinate[0] <= maximumLatitude &&
        minimumLongitude <= coordinate[1] &&
        coordinate[1] <= maximumLongitude
    ) {
        [latitude, longitude] = coordinate;
    } else if (
        minimumLatitude <= coordinate[1] &&
        coordinate[1] <= maximumLatitude &&
        minimumLongitude <= coordinate[0] &&
        coordinate[0] <= maximumLongitude
    ) {
        [longitude, latitude] = coordinate;
    } else {
        throw new Error('Given coordinate is outside Japan.');
    }

    const baseLat = latitude * 1.5;
    const baseLon = longitude - 100;

    const firstDegreeMeshCode =
        +Math.floor(baseLat).toString() + Math.floor(baseLon).toString();
    if (resolution === 'JIS-1' || resolution === '1' || resolution === '80km') {
        return firstDegreeMeshCode;
    }

    const x10MeshCode =
        firstDegreeMeshCode +
        (+(Math.floor(baseLat * 8) % 8).toString() +
            (Math.floor(baseLon * 8) % 8).toString());
    if (
        resolution === 'JIS-2' ||
        resolution === 'JIS-3-x10' ||
        resolution === '2' ||
        resolution === '10km'
    ) {
        return x10MeshCode;
    }

    const standardMeshCode =
        x10MeshCode +
        (+(Math.floor(baseLat * 8 * 10) % 10).toString() +
            (Math.floor(baseLon * 8 * 10) % 10).toString());
    if (resolution === 'JIS-3' || resolution === '3' || resolution === '1km') {
        return standardMeshCode;
    }

    const tenthMeshCode =
        standardMeshCode +
        (+(Math.floor(baseLat * 8 * 10 * 10) % 10).toString() +
            (Math.floor(baseLon * 8 * 10 * 10) % 10).toString());
    if (resolution === '100m') return tenthMeshCode;

    const halfMeshCode =
        standardMeshCode +
        (+1 +
            (Math.floor(baseLat * 8 * 10 * 2) % 2) * 2 +
            (Math.floor(baseLon * 8 * 10 * 2) % 2));
    if (
        resolution === 'JIS-3-1/2' ||
        resolution === '500m' ||
        resolution === '4'
    )
        return halfMeshCode;

    const halfHalfMeshCode =
        halfMeshCode +
        (+1 +
            (Math.floor(baseLat * 8 * 10 * 2 * 2) % 2) * 2 +
            (Math.floor(baseLon * 8 * 10 * 2 * 2) % 2));
    if (
        resolution === 'JIS-3-1/4' ||
        resolution === '250m' ||
        resolution === '5'
    )
        return halfHalfMeshCode;

    const halfHalfHalfMeshCode =
        halfHalfMeshCode +
        (+1 +
            (Math.floor(baseLat * 8 * 10 * 2 * 2 * 2) % 2) * 2 +
            (Math.floor(baseLon * 8 * 10 * 2 * 2 * 2) % 2));
    if (resolution === 'JIS-3-1/8' || resolution === '125m')
        return halfHalfHalfMeshCode;

    const x5MeshCode =
        x10MeshCode +
        (+1 +
            (Math.floor(baseLat * 8 * 2) % 2) * 2 +
            (Math.floor(baseLon * 8 * 2) % 2));
    if (resolution === 'JIS-3-x5' || resolution === '5km') return x5MeshCode;

    const x2MeshCode =
        x10MeshCode +
        (((Math.floor(baseLat * 8 * 5) % 5) * 2).toString() +
            ((Math.floor(baseLon * 8 * 5) % 5) * 2).toString() +
            '5');
    if (resolution === 'JIS-3-x2' || resolution === '2km') return x2MeshCode;

    const _exhaustiveCheck: never = resolution;
    return _exhaustiveCheck;
};
