import { AsyncStorageUtils } from "../utils/asyncStorageUtils";

type Listener = () => void;

export class Observable<T extends object> {
    private listeners: Listener[] = [];
  
    constructor(protected state: T) {
        this.state = new Proxy(state, {
            set: (target, property, value) => {
                target[property as keyof T] = value;
                this.notify(() => {});
                return true;
            }
        });
    }
  
    protected notify(change: () => void) {
        change();
        this.listeners.forEach((listener) => listener());
    }

    protected load = (key: string) => AsyncStorageUtils.get(key);
    protected remove = (key: string) => AsyncStorageUtils.remove(key);

    protected persist(key: string, value: any) {
        if (typeof value === 'undefined') return;

        const valToSet = (() => {
            if (typeof value === 'string') return value;
            if (typeof value === 'object') return JSON.stringify(value);
            return `${value}`;
        })();
        AsyncStorageUtils.set(key, valToSet);
    }
  
    getState(): T {
        return this.state;
    }
  
    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }
}
