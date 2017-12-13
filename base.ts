
enum ModelEvent {
    onCreate = "onCreate",
    onCreated = "onCreated",
    onDelete = "onDelete",
    onDeleted = "onDeleted",
    onUpdate = "onUpdate",
    onUpdated = "onUpdated",
}

enum CollectionEvent {
    onAdded = "onAdded",
    onDeleted = "onDeleted",
}

export interface ModelCallback<T> {
    (model: T, prop: string):void;
}

export interface CollectionCallback<T> {
    (models: T):void;
}

export interface DeferredModel {
    set(name: string, value: any):DeferredModel;
    save():void;
}

/**
 * Model defines the common interfaces that read, update, and listen
 * to the changes of data
 */
export interface Model {
    onChange(eventName: ModelEvent, prop: string, changeFunction: ModelCallback<Model>):void;
    get(name: string): any;
    set(name: string, val: any):void;
    batchUpdate(): DeferredModel;
    toJSON():Object;
    toImmutableJS():Object;
}

export interface Collection<T> {
    size(): number;
    get(id: string): T | null;
    add(item: T):void;
    delete(id: string):boolean;
    onChange(eventName: CollectionEvent, callback: CollectionCallback<T>):void;
    toList(): Array<T>;
}