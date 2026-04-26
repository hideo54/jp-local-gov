export { calculateCheckDigit, hasValidCheckDigit } from './check-digit.js';
export type {
    DesignatedCityWard,
    Municipality,
    Prefecture,
} from './data/types.js';
export type { Version } from './data/versions.js';
export {
    type FindByCodeOption,
    findByCode,
    type SearchByNameOption,
    searchByName,
} from './lookup.js';
