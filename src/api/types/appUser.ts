import { Language } from "~/lib/types/enums/Language";
import { loadInstanceVariables } from "~/lib/utils/classUtils";

export class AppUser {
    userId: string = '';
    name: string = '';
    phone: string = '';
    email: string = '';
    learnerLanguage: Language = Language.Unknown;
    learningLanguage: Language = Language.Unknown;
    createdAt: Date = new Date();
    updatedAt: Date = new Date();
    disabledAt?: Date | null = null;

    constructor(opts?: Partial<AppUser>) {
        loadInstanceVariables(opts);
    }
}