
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

interface ModelCallback<T> {
    (model: T, prop: string);
}

interface CollectionCallback<T> {
    (models: T);
}

interface DefferedModel {
    set(name: string, value: any);
    save();
}

/**
 * Model defines the common interfaces that read, update, and listen
 * to the changes of data
 */
export interface Model {
    onChange(eventName: ModelEvent, prop: string, changeFunction: ModelCallback<Model>);
    get(name: string): Model;
    set(name: string, val: any);
    batchUpdate(): DefferedModel;
    toJSON();
    toImmutableJS();
}

export interface Collection<T> {
    size(): number;
    get(id: string): T;
    add(item: T);
    delete(id: string);
    onChange(eventName: CollectionEvent, callback: CollectionCallback<T>);
    toList(): Array<T>;
}