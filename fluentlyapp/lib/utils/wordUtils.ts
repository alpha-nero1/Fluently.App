import { WordBase } from '~/api/types/wordBase';

export const getName = (word: WordBase) => {
    if (word?.definiteArticle) {
        return `(${word.definiteArticle}) ${word.name}`.trim()
    }
    if (word?.infinitive && word.infinitive !== word.name) {
        return `${word.name} (${word.infinitive})`.trim()
    }
    return word?.name?.trim();
}