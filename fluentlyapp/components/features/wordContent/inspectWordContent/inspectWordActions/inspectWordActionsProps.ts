import { WordBase } from "~/api/types/wordBase";

export interface IInspectWordActionsProps {
    name: string;
    word: WordBase;
    saved?: boolean;
    isLoading?: boolean;

    /**
     *  When the word is added to the set. 
     */
    onAdd: () => void;

    /**
     * When the user clicks edit.
     */
    onEdit: () => void;

    /**
     * When the user clicks delete.
     */
    onRemove: () => void;
}