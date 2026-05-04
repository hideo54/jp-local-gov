import { calculateCheckDigit, hasValidCheckDigit } from './check-digit.js';
import type {
    DesignatedCityWard,
    Municipality,
    Prefecture,
} from './data/types.js';
import {
    getDataByVersion,
    latestVersion,
    type Version,
    versions,
} from './data/versions.js';

export interface FindByCodeOption {
    version?: Version;
}

const codeMapsByVersion = new Map(
    versions.map(version => {
        const { designatedCityWards, municipalities, prefectures } =
            getDataByVersion(version);
        const map = new Map<
            string,
            DesignatedCityWard | Municipality | Prefecture
        >();
        for (const ward of designatedCityWards) map.set(ward.code, ward);
        for (const municipality of municipalities)
            map.set(municipality.code, municipality);
        for (const prefecture of prefectures)
            map.set(prefecture.code, prefecture);
        return [version, map] as const;
    }),
);

export const findByCode = (
    code: string,
    options?: FindByCodeOption,
): DesignatedCityWard | Municipality | Prefecture | undefined => {
    const isValidFormat = /^\d{5,6}$/.test(code);
    if (!isValidFormat) {
        throw new Error('Invalid code format');
    }
    if (code.length === 6 && !hasValidCheckDigit(code)) {
        throw new Error('Invalid check digit');
    }

    const version = options?.version ?? latestVersion;
    const codeWithCheckDigit =
        code.length === 5 ? code + calculateCheckDigit(code) : code;
    return codeMapsByVersion.get(version)?.get(codeWithCheckDigit);
};

export interface SearchByNameOption {
    version?: Version;
    prefectureName?: string;
    excludeDesignatedCityWards?: boolean;
    excludeMunicipalities?: boolean;
    excludePrefectures?: boolean;
    partial?: boolean;
}

export const searchByName = (
    name: string,
    options?: SearchByNameOption,
): (DesignatedCityWard | Municipality | Prefecture)[] => {
    const {
        version = latestVersion,
        prefectureName,
        excludeDesignatedCityWards = false,
        excludeMunicipalities = false,
        excludePrefectures = false,
        partial = false,
    } = options ?? {};
    const { designatedCityWards, municipalities, prefectures } =
        getDataByVersion(version);
    const matches = (target: string) =>
        partial ? target.includes(name) : target === name;
    const results: (DesignatedCityWard | Municipality | Prefecture)[] = [];
    if (!excludeDesignatedCityWards) {
        results.push(
            ...designatedCityWards.filter(
                ward =>
                    (matches(ward.cityName) || matches(ward.cityRuby)) &&
                    (!prefectureName || ward.prefectureName === prefectureName),
            ),
        );
    }
    if (!excludeMunicipalities) {
        results.push(
            ...municipalities.filter(
                municipality =>
                    (matches(municipality.municipalityName) ||
                        matches(municipality.municipalityRuby)) &&
                    (!prefectureName ||
                        municipality.prefectureName === prefectureName),
            ),
        );
    }
    if (!excludePrefectures) {
        results.push(
            ...prefectures.filter(
                prefecture =>
                    matches(prefecture.prefectureName) ||
                    matches(prefecture.prefectureRuby),
            ),
        );
    }
    return results;
};
