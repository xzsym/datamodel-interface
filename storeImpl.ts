import { MessageStore, StreamStore, UserStore, Message, Stream, StoreDataCallback } from './interfaces';
import { SocialMessageImpl } from './messageImpl';

export class MessageStoreImpl<Message> implements MessageStore {
    get(id:string) {
        return null;
    }

    getMessage(id:string) {
        return null;
    }

    onReceiveData(eventName:string, callback:StoreDataCallback<Message>) {
        setInterval(() => {
            const message = new SocialMessageImpl();
            callback(message, this);
        }, 1000);
    }

}

export class StreamStoreImpl implements StreamStore {
    private streams:{ [key: string]: Stream }
    get(id:string) {
        return null;
    }

    getStream(id:string) {
        return this.streams[id];
    }

    addStream(stream:Stream) {
        this.streams[stream.get('id')] = stream;
    }
}

export class UserStoreImpl implements UserStore {
    get(id:string) {
        return null;
    }

    getUser(id: string) {
        return null;
    }
}