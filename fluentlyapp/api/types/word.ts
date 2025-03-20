import { WordBase } from "./wordBase";

/**
 * A word.
 */
export class Word extends WordBase {
    wordId: number = 0;

    constructor(opts?: Partial<Word>) {
      super(opts);
      if (opts?.wordId) this.wordId = opts.wordId;
    }
}