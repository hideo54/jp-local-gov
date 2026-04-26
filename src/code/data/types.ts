export interface Prefecture {
    type: 'prefecture';
    code: string;
    prefectureName: string;
    prefectureRuby: string;
}

export interface Municipality {
    type: 'municipality';
    code: string;
    prefectureName: string;
    municipalityName: string;
    municipalityRuby: string;
}

export interface DesignatedCityWard {
    type: 'designated-city-ward';
    code: string;
    prefectureName: string;
    municipalityName: string;
    cityName: string;
    cityRuby: string;
}
