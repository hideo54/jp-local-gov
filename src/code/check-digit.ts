const isValidFormatWithoutCheckDigit = (code: string) => /^\d{5}$/.test(code);
const isValidFormatWithCheckDigit = (code: string) => /^\d{6}$/.test(code);

// https://www.soumu.go.jp/main_content/000137948.pdf
export const calculateCheckDigit = (code: string): number => {
    if (!isValidFormatWithoutCheckDigit(code)) {
        throw new Error('Invalid code format for check digit calculation');
    }
    const digits = code.split('').map(s => Number(s));
    const sumOfProducts =
        digits[0] * 6 +
        digits[1] * 5 +
        digits[2] * 4 +
        digits[3] * 3 +
        digits[4] * 2;
    return (11 - (sumOfProducts % 11)) % 10;
};

export const hasValidCheckDigit = (code: string): boolean => {
    if (!isValidFormatWithCheckDigit(code)) {
        return false;
    }
    const checkDigit = calculateCheckDigit(code.slice(0, 5));
    return Number(code[5]) === checkDigit;
};
