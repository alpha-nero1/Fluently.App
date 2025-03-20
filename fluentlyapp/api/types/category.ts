import { loadInstanceVariables } from "~/lib/utils/classUtils";
import { BasicDto } from "./basicDto";

export class Category extends BasicDto {
    categoryId = 0;
    name = "";

    constructor(opt?: Partial<Category>) {
        super();
        loadInstanceVariables(this, opt || {});
    }
}