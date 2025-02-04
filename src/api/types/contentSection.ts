import { loadInstanceVariables } from "~/lib/utils/classUtils";
import { BasicDto } from "./basicDto";

export class ContentSection extends BasicDto {
    public contentSectionId: number = 0;
    public contentId: string = '';
    public title: string = '';
    public index: number = 0;

    constructor(opts?: Partial<ContentSection>) {
        super(opts);
        loadInstanceVariables(opts);
    }
}