import { Collection } from './base';

export class CollectionBase<T> implements Collection<T> {
    private models: Array<T>;
    constructor(models?: [T]) {
        this.models = models || [];
    }
    size() {
        return this.models.length;
    }
    get(id) {
        return this.models[id];
    }
    add(item) {
        this.models.push(item);
    }
    delete(id) {
        this.models.splice(id, 1);
    }
    onChange(str, callback) {}
    toList(): Array<T> {
        return this.models;
    }
}