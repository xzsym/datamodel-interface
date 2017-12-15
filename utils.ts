import { Model, ModelCallback } from './base';

export function batchNotifyListeners<T>(propName:string, modelListeners: {[key: string]: ModelCallback<T>[]}) {
    if (modelListeners[propName]) {
        
    }
}