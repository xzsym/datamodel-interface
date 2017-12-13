import { User, Stream, SocialMessage } from './interfaces';
import { CollectionBase } from './baseImpl';
import { SocialMessageImpl } from './messageImpl';
import { Transport } from './requests';


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

    uploadAttachment(attachment) {
        return Promise.resolve(attachment);
    }

    sendMessage() {
        return Promise.resolve(new SocialMessageImpl());
    }

    onNewMessage(newMessageCallback) {

    }

    sendReceipt(messages) {
        return Transport.execute('SendReceipt', { messages });
    }

    toJSON() {
        return {};
    }
    toImmutableJS() {
        return {};
    }
    
}