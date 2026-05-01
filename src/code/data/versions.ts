import { designatedCityWards as designatedCityWards2024 } from './2024-01-01/designatedCityWards.js';
import { municipalities as municipalities2024 } from './2024-01-01/municipalities.js';
import { prefectures as prefectures2024 } from './2024-01-01/prefectures.js';

export const versions = ['2024-01-01'] as const;

export type Version = (typeof versions)[number];
export const latestVersion: Version = versions[versions.length - 1];

/* v8 ignore start */
export const getDataByVersion = (version: Version) => {
    if (version === '2024-01-01') {
        return {
            designatedCityWards: designatedCityWards2024,
            municipalities: municipalities2024,
            prefectures: prefectures2024,
        };
    }
    const _exhaustiveCheck: never = version;
    return _exhaustiveCheck;
};
/* v8 ignore stop */
