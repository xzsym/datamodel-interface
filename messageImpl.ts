import { ModelCallback, DeferredModel } from './base';
import { WallPost, SocialMessage } from './interfaces';

export class WallPostImpl implements WallPost {
    private msgObj: {[key:string]: any};

    get(id:string) {
        return this.msgObj[id];
    }

    set(id:string, value:any) {
        this.msgObj[id] = value;
    }

    batchUpdate() {
        let updates:object[] = [];
        const deferredModel: DeferredModel = {
            set: (name:string, value:any) => {
                updates.push({
                    [name]: value
                })
                return deferredModel;
            },
            save: () => {
                // loop through changes and submit updates together
            }
        };
        return deferredModel;
    }

    onChange(eventName:string, prop:string, callback:ModelCallback<WallPost>) {
    }

    toJSON() {
        return this.msgObj;
    }
    toImmutableJS() {
        // TODO: create immutable object
        return {};
    }
}

export class SocialMessageImpl implements SocialMessage {
    private msgObj: {[key:string]: any}

    get(id:string) {
        return this.msgObj[id];
    }

    set(id:string, value:any) {
        this.msgObj[id] = value;
    }

    getAttachments() {
        return [];
    }

    batchUpdate() {
        let updates:object[] = [];
        const deferredModel: DeferredModel = {
            set: (name:string, value:any) => {
                updates.push({
                    [name]: value
                })
                return deferredModel;
            },
            save: () => {
                // loop through changes and submit updates together
            }
        };
        return deferredModel;
    }

    onChange(eventName:string, prop:string, callback:ModelCallback<SocialMessage>) {
    }

    toJSON() {
        return this.msgObj;
    }
    toImmutableJS() {
        // TODO: create immutable object
        return {};
    }
}
