import { SetCardGrade } from "~/lib/types/enums/SetCardGrade";
import { WordBase } from "./wordBase";

/**
 * A set card.
 */
export class SetCard extends WordBase {
  setId: number = 0;
  setCardId: number = 0;
  currentGrade: SetCardGrade = SetCardGrade.Unknown;

  constructor(opts?: Partial<SetCard>) {
    super(opts);
    if (opts?.setId) this.setId = opts.setId;
    if (opts?.setCardId) this.setCardId = opts.setCardId;
  }
}