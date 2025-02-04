import { loadInstanceVariables } from "~/lib/utils/classUtils";

export class ContentData {
    public contentDataId: number = 0;
    public contentSectionId: number = 0;
    public contentId: string = '';
    public data: string = '';

    constructor(opts?: Partial<ContentData>) {
        loadInstanceVariables(opts);
    }
}