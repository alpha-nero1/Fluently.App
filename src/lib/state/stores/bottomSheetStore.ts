import { Observable } from '../observable';

export enum BottomSheetType {
    WordBottomSheet,
    LanguageBottomSheet,
    ManageSubscription,
    Subscribe
}

export interface BottomSheetMessage {
    type: BottomSheetType;
    data: any;
    onClose: (selected?: any) => void;
}

interface BottomSheetStoreState {
    message: BottomSheetMessage | null;
}

export class BottomSheetStore extends Observable<BottomSheetStoreState> {
    constructor() {
        super({ message: null });
    }

    public get message() {
        return this.getState().message;
    }

    public setMessage = (message: BottomSheetMessage) => {
        this.notify(() => {
            this.getState().message = message;
        });
    }

    public closeMessage = (item?: any) => {
        this.message?.onClose(item);
        this.notify(() => {
            this.getState().message = null;
        });
    }
}