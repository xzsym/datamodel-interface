import { Model, Collection, CollectionEvent, CollectionCallback } from './base';

export class CollectionBase<T extends Model> implements Collection<T> {
    private models: Array<T>;
    private idMap: {[key: string]: number};
    private addListeners: {[key: string]: CollectionCallback<T>};
    private removeListeners: {[key: string]: CollectionCallback<T>};
    private listenerCount = 0;

    constructor(models?: [T]) {
        this.models = models || [];
        this.idMap = {};
        this.models.forEach((model, idx) => {
            this.idMap[model.id] = idx;
        });
        this.addListeners = {};
        this.removeListeners = {};
    }
    size() {
        return this.models.length;
    }
    get(id:string) {
        const idx = this.idMap[id];
        if (idx > -1) {
            return this.models[idx];
        }
        return null;
    }
    add(item:T) {
        this.idMap[item.id] = this.models.push(item);
        // notify add listeners
        for (let key in this.addListeners) {
            this.addListeners[key](item);
        }
    }
    delete(id:string) {
        let idx = this.idMap[id];
        if (idx > -1) {
            const [item] = this.models.splice(idx, 1);
            for(let i = idx, len = this.models.length; i < len; i++) {
                this.idMap[this.models[i].id] -= 1;
            }
            // notify remove listeners
            for (let key in this.removeListeners) {
                this.removeListeners[key](item);
            }
            return true;
        }
        return false;
    }
    
    // the subclass should implement there onChange function
    onChange(eventName:CollectionEvent, callback: CollectionCallback<T>) {
        const listenerId = `listener${this.listenerCount}`;
        if (eventName === CollectionEvent.onAdded) {
            this.addListeners[listenerId] = callback;
            this.listenerCount += 1;
            return () => {
                delete this.addListeners[listenerId];
            }
        } else if (eventName === CollectionEvent.onDeleted) {
            this.removeListeners[listenerId] = callback;
            this.listenerCount += 1;
            return () => {
                delete this.removeListeners[listenerId];
            }
        }
    }

    toList(): Array<T> {
        return this.models;
    }
}