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

    protected async load(key: string) {
        return await AsyncStorageUtils.get(key)
    }

    protected persist(key: string, value: any) {
        AsyncStorageUtils.set(key, value);
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
