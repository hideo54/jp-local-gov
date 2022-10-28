import codesJson from './codes.json';

// Official document: https://www.soumu.go.jp/denshijiti/code.html

// https://www.soumu.go.jp/main_content/000137948.pdf
export const verifyCheckDigit = (code: string) => {
    const satisfyFormat = /^\d{6}$/.test(code);
    if (!satisfyFormat) return false;
    const digits = code.split('').map(s => Number(s));
    const sumOfProducts = (
        digits[0] * 6
        + digits[1] * 5
        + digits[2] * 4
        + digits[3] * 3
        + digits[4] * 2
    );
    const checkDigit = (11 - (sumOfProducts % 11)) % 10;
    return digits[5] === checkDigit;
};

export const getCodeInfo = (code: string) => {
    if (!verifyCheckDigit(code)) {
        throw new Error('Wrong code');
    }
    const prefectureCode = code.slice(0, 2);
    const prefecture = codesJson[Number(prefectureCode) - 1];
    const { municipalities: _, ...prefectureWithoutMunicipalities } = prefecture;
    if (code === prefecture.code) {
        // The code is of prefecture.
        return prefecture;
    }
    const municipalities = prefecture.municipalities;
    const matchingMunicipalities = municipalities.filter(municipality =>
        municipality.code === code
    );
    // The length must be 1 or 0.
    if (matchingMunicipalities.length > 0) {
        // The code is of municipality.
        return {
            ...matchingMunicipalities[0],
            prefecture: prefectureWithoutMunicipalities,
        };
    }
    const matchingWards = municipalities.map(municipality =>
        municipality.wards || []
    ).flat().filter(ward =>
        ward.code === code
    );
    // The length must be 1 or 0.
    if (matchingWards.length > 0) {
        // The code is of ward.
        const municipality = municipalities.filter(municipality =>
            municipality.wards?.map(ward => ward.code).includes(code)
        )[0];
        const { wards: _, ...municipalityWithoutWards } = municipality;
        return {
            ...matchingWards[0],
            municipality: municipalityWithoutWards,
            prefecture: prefectureWithoutMunicipalities,
        };
    }
    return null;
};
