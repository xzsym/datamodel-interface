import { User, Stream, SocialMessage } from './interfaces';
import { CollectionBase } from './baseImpl';

export class StreamImpl implements Stream {

    getMessages(from: number, count: number) {
        return [];
    }

    getMembers() {
        return new CollectionBase<User>();
    }

    get(name) {
        return null;
    }

    set(name, value) {
    }

    onChange(eventName, prop, callback) {
        callback();
    }

    batchUpdate() {
        return null;
    }

    uploadAttachment() {

    }

    sendMessage() {

    }

    onNewMessage(newMessageCallback) {

    }

    toJSON() {}
    toImmutableJS() {}
    
}