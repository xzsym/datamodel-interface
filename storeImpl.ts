import { MessageStore, StreamStore, UserStore, Stream } from './interfaces';

export class MessageStoreImpl implements MessageStore {
    get(id) {
        return null;
    }

    getMessage(id) {
        return null;
    }

    onReceiveData() {
        return;
    }
}

export class StreamStoreImpl implements StreamStore {
    get(id) {
        return null;
    }

    getStream(id): Stream {
        return null;
    }

    onReceiveData() {
        return;
    }
}

export class UserStoreImpl implements UserStore {
    get(id) {
        return null;
    }

    getUser() {
        return null;
    }

    onReceiveData() {
        return;
    }
}