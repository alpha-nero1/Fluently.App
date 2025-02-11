import { DialingCodeToISO } from "../constants/language";

const dialCodeRegex1 = /^\+([1-9]\d{0,3})/;
const dialCodeRegex2 = /^\+([1-9]\d{0,2})/;
const dialCodeRegex3 = /^\+([1-9]\d{0,1})/;

/**
 * Get the dial code form a bit of text.
 */
export const extractDialCode = (text: string = '') => {
    const regexs = [dialCodeRegex1, dialCodeRegex2, dialCodeRegex3];
    for (let i = 0; i < regexs.length; i++) {
        const reg = regexs[i];
        const m = text.match(reg);
        if (m && DialingCodeToISO.has(`+${m[1]}`)) {
            return `+${m[1]}`;
        }
    }
    return '';
}