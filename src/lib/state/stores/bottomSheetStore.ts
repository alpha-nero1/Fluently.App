import { Observable } from '../observable';

export enum BottomSheetType {
    WordBottomSheet
}

export interface BottomSheetMessage {
    type: BottomSheetType;
    data: any;
    onClose: () => void;
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

    public closeMessage = () => {
        this.message?.onClose();
        this.notify(() => {
            this.getState().message = null;
        });
    }
}