import { ModelCallback, ModelEvent } from '../base';
import { WallPost, SocialMessage, WritableSocialMessageProps, WritableWallPostMessageProps } from '../datamodel';
import { batchNotifyListeners } from './utils';

export class WallPostImpl implements WallPost {
    private msgObj: {[key:string]: any}
    private listeners : {[key:string]: ModelCallback<SocialMessage>[]}

    constructor(props: {[key:string]: any}) {
        this.msgObj = {};
        for (let key in props) {
            this.msgObj[key] = props;
        }
        this.listeners = {};
    }

    get id() {
        return this.msgObj.id;
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
    
    get messageType() {
        return 'WALL_POST';
    }

    update(newMessageProps:WritableWallPostMessageProps) {
        // Update only the user pretty name when alias changed
        this.msgObj.text = newMessageProps.text;
        batchNotifyListeners('userPrettyName', this.listeners);
        return Promise.resolve(this);
    }

    like() {
        return Promise.resolve(this);
    }

    share() {
        return Promise.resolve(this);
    }

    onChange(eventName:string, prop:string, callback:ModelCallback<SocialMessage>) {
        // The demo implementation ignores created and deleted events, and only cares
        // about the onUpdated event

        // register listeners
        if (eventName === ModelEvent.onUpdated) {
            if (!this.listeners[prop]) {
                this.listeners[prop] = [callback];
            } else {
                this.listeners[prop].push(callback);
            }
        }
    }

    toJSON() {
        return this.msgObj;
    }
    toImmutableJS() {
        // TODO: create immutable object
        return {};
    }
}

/**
 * A reference implementation of SocialMessage
 */
export class SocialMessageImpl implements SocialMessage {
    private msgObj: {[key:string]: any}
    private listeners : {[key:string]: ModelCallback<SocialMessage>[]}

    constructor(props: {[key:string]: any}) {
        this.msgObj = {};
        for (let key in props) {
            this.msgObj[key] = props;
        }
        this.listeners = {};
    }

    get id() {
        return this.msgObj.id;
    }

    get messageType() {
        return 'SOCIAL_MESSAGE';
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

    get isChime() {
        return this.msgObj.isChime;
    }

    get isHighlighted() {
        return this.msgObj.isHighlighted;
    }

    get isReadByMe() {
        return this.msgObj.isReadByMe;
    }

    get isReadByOthers() {
        return this.msgObj.isReadByOthers;
    }

    get isSuppressed() {
        return this.msgObj.isSuppressed;
    }

    get text() {
        return this.msgObj.text;
    }

    get userId() {
        return this.msgObj.userId;
    }

    get userPrettyName() {
        return this.msgObj.userPrettyName;
    }

    update(newMessageProps:WritableSocialMessageProps) {
        // Update only the user pretty name when alias changed
        this.msgObj.userPrettyName = newMessageProps.userPrettyName;
        batchNotifyListeners('userPrettyName', this.listeners);
        return Promise.resolve(this);
    }

    onChange(eventName:string, prop:string, callback:ModelCallback<SocialMessage>) {
        // The demo implementation ignores created and deleted events, and only cares
        // about the onUpdated event

        // register listeners
        if (eventName === ModelEvent.onUpdated) {
            if (!this.listeners[prop]) {
                this.listeners[prop] = [callback];
            } else {
                this.listeners[prop].push(callback);
            }
        }
    }

    toJSON() {
        return this.msgObj;
    }
    toImmutableJS() {
        // TODO: create immutable object
        return {};
    }
}
