import { loadInstanceVariables } from "~/lib/utils/classUtils";

export class BasicDto {
    public updatedAt: string = '';
    public createdAt: string = '';
    public disabledAt: string = '';

    constructor(opts?: Partial<BasicDto>) {
        loadInstanceVariables(this, opts || {})
    }
}