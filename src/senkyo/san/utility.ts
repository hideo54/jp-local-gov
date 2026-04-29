import { getOne } from '../../lib.js';
import type { SanDistrict2015 } from './senkyoku/2015-11-05.js';
import { sanDistricts2015 } from './senkyoku/2015-11-05.js';

interface SanDistrictVersion {
    enforcedFrom: string;
    districts: readonly SanDistrict2015[];
}

const sanDistrictVersions: readonly SanDistrictVersion[] = [
    { enforcedFrom: '2015-11-05', districts: sanDistricts2015 },
];

const getSanDistrictVersion = (date: string): SanDistrictVersion => {
    const version = sanDistrictVersions
        .filter(v => v.enforcedFrom <= date)
        .at(-1);
    if (!version) {
        throw new Error(
            `Date predates the current san district system: ${date}`,
        );
    }
    return version;
};

export const getSanDistrictName = (id: string, date: string): string =>
    getOne(
        getSanDistrictVersion(date).districts.filter(d => d.id === id),
        id,
    ).name;

export const getSanDistrictSeats = (id: string, date: string): number =>
    getOne(
        getSanDistrictVersion(date).districts.filter(d => d.id === id),
        id,
    ).seats;

export const compareSanDistrictIds =
    (date: string) =>
    (a: string, b: string): number => {
        const { districts } = getSanDistrictVersion(date);
        return (
            districts.findIndex(d => d.id === a) -
            districts.findIndex(d => d.id === b)
        );
    };
