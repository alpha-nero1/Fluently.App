import { loadInstanceVariables } from "~/lib/utils/classUtils";

export enum Rating {
    Unknown = -1,
    OneStar,
    TwoStar,
    ThreeStar,
    FourStar,
    FiveStar
}

export class Feedback {
    userId: string = '';
    text: string = '';
    rating: Rating = Rating.Unknown;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    disabledAt?: Date | null = null;

    constructor(opts?: Partial<Feedback>) {
        loadInstanceVariables(opts);
    }
}