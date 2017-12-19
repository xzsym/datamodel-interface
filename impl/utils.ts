import { Model, ModelCallback } from '../base';

export function batchNotifyListeners<T>(propName:string, modelListeners: {[key: string]: ModelCallback<T>[]}, model:T) {
    if (modelListeners[propName]) {
        let listeners = modelListeners[propName] || [];
        listeners.forEach((callback) => {
            callback(model, propName);
        });;
    }
}