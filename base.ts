
export enum ModelEvent {
    onCreate = "onCreate",
    onCreated = "onCreated",
    onDelete = "onDelete",
    onDeleted = "onDeleted",
    onUpdate = "onUpdate",
    onUpdated = "onUpdated",
}

export enum CollectionEvent {
    onAdded = "onAdded",
    onDeleted = "onDeleted",
}

export interface ModelCallback<T> {
    (model: T, prop: string):void;
}

export interface CollectionCallback<T> {
    (models: T):void;
}

/**
 * Model defines the common interfaces that read, update, and listen
 * to the changes of data
 */
export interface Model {
    readonly id: string;
    onChange(eventName: ModelEvent, prop: string, changeFunction: ModelCallback<Model>):void;
    update(modelProps:{[key: string]: any}): Promise<Model>;
    toJSON(): Object;
    toImmutableJS(): Object;
}

export interface Collection<T> {
    size(): number;
    add(item: T):void;
    delete(id: string):boolean;
    onChange(eventName: CollectionEvent, callback: CollectionCallback<T>):void;
    toList(): Array<T>;
}