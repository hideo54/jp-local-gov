type Degree =
    | 'JIS-1' // JISX0410:2002 により定められている「第1次地域区画」(約 80 km)
    | 'JIS-2' // 「第2次地域区画」(約 10 km)
    | 'JIS-3-x10' // 統合地域メッシュ「10倍地域メッシュ」(約 10 km)。'JIS-2' と同様。
    | 'JIS-3-x5' // 統合地域メッシュ「5倍地域メッシュ」(約 5 km)
    | 'JIS-3-x2' // 統合地域メッシュ「2倍地域メッシュ」(約 2 km)
    | 'JIS-3' // 「第3次地域区画」(約 1 km)。「基準地域メッシュコード」。
    | 'JIS-3-1/2' // 分割地域メッシュ「2分の1地域メッシュ」(約 500 m)
    | '4' | '500m' // 'JIS-3-1/2' と同等。国土数値情報などが使用。
    | 'JIS-3-1/4' // 分割地域メッシュ「4分の1地域メッシュ」(約 250 m)
    | '5' | '250m' // 'JIS-3-1/4' と同等
    | 'JIS-3-1/8' // 分割地域メッシュ「8分の1地域メッシュ」(約 125 m)
    | '125m' // 'JIS-3-1/8' と同等
    | '100m'; // 国土数値情報の土地利用データなどが使用

export const coordinateToMeshCode = (coordinate: [number, number], degree: Degree = 'JIS-3'): string => {
    let latitude, longitude: number;

    if (24 <= coordinate[0] && coordinate[0] <= 46 && 122 <= coordinate[1] && coordinate[1] <= 149) {
        [latitude, longitude] = coordinate;
    } else if (24 <= coordinate[1] && coordinate[1] <= 46 && 122 <= coordinate[0] && coordinate[0] <= 149) {
        [longitude, latitude] = coordinate;
    } else {
        throw new Error('Given coordinate is outside Japan.');
    }

    const baseLat = latitude * 1.5;
    const baseLon = longitude - 100;

    const firstDegreeMeshCode = (
        + Math.floor(baseLat).toString()
        + Math.floor(baseLon).toString()
    );
    if (degree === 'JIS-1') return firstDegreeMeshCode;

    const x10MeshCode = firstDegreeMeshCode + (
        + (Math.floor(baseLat * 8) % 8).toString()
        + (Math.floor(baseLon * 8) % 8).toString()
    );
    if (degree === 'JIS-2' || degree === 'JIS-3-x10') {
        return x10MeshCode;
    }

    const standardMeshCode = x10MeshCode + (
        + (Math.floor(baseLat * 8 * 10) % 10).toString()
        + (Math.floor(baseLon * 8 * 10) % 10).toString()
    );
    if (degree === 'JIS-3') return standardMeshCode;

    const tenthMeshCode = standardMeshCode + (
        + (Math.floor(baseLat * 8 * 10 * 10) % 10).toString()
        + (Math.floor(baseLon * 8 * 10 * 10) % 10).toString()
    );
    if (degree === '100m') return tenthMeshCode;

    const halfMeshCode = standardMeshCode + (
        + 1
        + Math.floor(baseLat * 8 * 10 * 2) % 2 * 2
        + Math.floor(baseLon * 8 * 10 * 2) % 2
    );
    if (degree === 'JIS-3-1/2' || degree === '500m' || degree === '4') return halfMeshCode;

    const halfHalfMeshCode = halfMeshCode + (
        + 1
        + Math.floor(baseLat * 8 * 10 * 2 * 2) % 2 * 2
        + Math.floor(baseLon * 8 * 10 * 2 * 2) % 2
    );
    if (degree === 'JIS-3-1/4' || degree === '250m' || degree === '5') return halfHalfMeshCode;

    const halfHalfHalfMeshCode = halfHalfMeshCode + (
        + 1
        + Math.floor(baseLat * 8 * 10 * 2 * 2 * 2) % 2 * 2
        + Math.floor(baseLon * 8 * 10 * 2 * 2 * 2) % 2
    );
    if (degree === 'JIS-3-1/8' || degree === '125m') return halfHalfHalfMeshCode;

    const x5MeshCode = x10MeshCode + (
        + 1
        + Math.floor(baseLat * 8 * 2) % 2 * 2
        + Math.floor(baseLon * 8 * 2) % 2
    );
    if (degree === 'JIS-3-x5') return x5MeshCode;

    const x2MeshCode = x10MeshCode + (
        + (Math.floor(baseLat * 8 * 8) % 8).toString()
        + (Math.floor(baseLon * 8 * 8) % 8).toString()
        + '5'
    );
    if (degree === 'JIS-3-x2') return x2MeshCode;

    const defaultResulut = standardMeshCode;
    return defaultResulut;
};
