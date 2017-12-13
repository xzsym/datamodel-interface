import { Model, Collection, CollectionCallback } from './base';

export class CollectionBase<T extends Model> implements Collection<T> {
    private models: Array<T>;
    private idMap: {[key: string]: number};

    constructor(models?: [T]) {
        this.models = models || [];
        this.idMap = {};
        this.models.forEach((model, idx) => {
            this.idMap[model.get('id')] = idx;
        });
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
        this.idMap[item.get('id')] = this.models.push(item);
    }
    delete(id:string) {
        let idx = this.idMap[id];
        if (idx > -1) {
            this.models.splice(idx, 1);
            for(let i = idx, len = this.models.length; i < len; i++) {
                this.idMap[this.models[i].get('id')] -= 1;
            }
            return true;
        }
        return false;
    }
    onChange(str:string, callback: CollectionCallback<T>) {

    }
    toList(): Array<T> {
        return this.models;
    }
}