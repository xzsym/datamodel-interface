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

    get clientId() {
        return this.msgObj.clientId;
    }

    get streamId() {
        return this.msgObj.streamId;
    }

    get ingestionDate() {
        return this.msgObj.ingestionDate;
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

    get clientId() {
        return this.msgObj.clientId;
    }

    get streamId() {
        return this.msgObj.streamId;
    }

    get ingestionDate() {
        return this.msgObj.ingestionDate;
    }

    get attachments() {
        return this.msgObj.attachments;
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
