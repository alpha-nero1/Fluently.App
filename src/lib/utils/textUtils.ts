import { WordDictionary } from "~/api/types/wordDictionary";

/**
 *  Capitalise the first character in a string. 
 */
export const capitaliseFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const spansToString = (lines: string[][]) => {
    let str = '';
    lines.forEach(spans => {
        spans.forEach(span => {
            str += ` ${span}`;
        })
        str += '\n';
    })
    return str;
}

/**
 * Count how many words are present in the dictionary.
 */
export const countWordsPresent = (lines: string[][], dictionary: WordDictionary): number => {
    let count = 0;
    lines.forEach(spans => {
        spans.forEach(span => {
            if (dictionary[span]) {
                count += 1;
            }
        })
    })
    return count;
}