import { Observable } from '../observable';

export type SnackbarStatus = 'success' | 'info' | 'warning' | 'error';

export interface SnackbarMessage {
    count?: number;
    level?: 'success' | 'info' | 'warning' | 'error'
    message: string;
    duration?: number;
}

interface SnackbarState {
    messageCounter: number;
    messages: SnackbarMessage[];
}

const messageDurationDefault = 5000;
const messageLevelDefault = 'info';

export class SnackbarStore extends Observable<SnackbarState> {
    constructor() {
        super({ messages: [], messageCounter: 0 });
    }

    public get messages() {
        return this.getState().messages;
    }

    public get messageCounter() {
        return this.getState().messageCounter;
    }

    public enqueueMessage = (message: SnackbarMessage) => {
        const messageId = this.getState().messageCounter + 1;
        if (!message.duration) message.duration = messageDurationDefault;
        if (!message.level) message.level = messageLevelDefault;
        message.count = messageId;

        this.notify(() => {
            this.getState().messageCounter += 1;
            this.getState().messages.push(message);
        });

        // Clear message after it has been pushed.
        setTimeout(() => {
            this.dequeueMessage(messageId);
        }, message.duration);
    }

    public dequeueMessage = (messageId: number) => {
        this.notify(() => {
            this.getState().messages = this.getState().messages.filter(msg => msg.count !== messageId);
        });
    }
}