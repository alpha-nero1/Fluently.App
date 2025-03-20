import { SetCardGrade } from "~/lib/types/enums/SetCardGrade";
import { loadInstanceVariables } from "~/lib/utils/classUtils";

export class SetCardReviewResult {
    setCardId: number = 0;
    grade: SetCardGrade = SetCardGrade.Unknown;
    reviewMs: number = 0;

    constructor(opts: Partial<SetCardReviewResult>) {
        loadInstanceVariables(this, opts || {});
    }
}