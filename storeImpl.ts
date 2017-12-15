import { Collection, CollectionCallback } from './base';
import { Store, StreamStore, UserStore, Message, Stream, User, StreamType } from './interfaces';
import { SocialMessageImpl } from './messageImpl';
import { RoomStreamImpl, IMStreamImpl } from './streamImpl';
import { CollectionBase } from './baseImpl';

export interface StoreDataCallback<T> {
    (data: T): void;
}

interface StreamDataListener<T> {
    onReceiveData(streamId: string, callback:StoreDataCallback<T>): void;
}

const demoStreamIds = ['xx', 'yy', 'zz'];

export class MessageStore implements StreamDataListener<Message> {
    private allMessages: Message[];
    private idMap: { [key: string]: Message };
    private listeners: { [key: string]: StoreDataCallback<Message> };

    constructor() {
        this.allMessages = [];
        this.idMap = {};
    }

    getMessage(id: string): Message | null {
        return this.idMap[id];
    }

    onReceiveData(streamId:string, callback:StoreDataCallback<Message>) {
        this.listeners[streamId] = callback;
    }

    saveMessage(message: Message) {
        if (this.listeners[message.streamId]) {
            this.listeners[message.streamId](message);
        }
    }

    start() {
        let count = 0;
        // Mock: mocking the stream messages
        setInterval(() => {
            let streamId = Math.floor(Math.random()*3);
            let newSocialMessage = new SocialMessageImpl({
                id: Date.now(),
                text: `New message: ${count}`,
                streamId,
            });
            console.log('Receive message from stream...', newSocialMessage);
            this.saveMessage(newSocialMessage);
            count += 1;
        }, 100000 * Math.random());
    }
}

export class StreamStoreImpl implements StreamStore {
    private streams:{ [key: string]: Stream }
    private messageStore: MessageStore;
    private userStore: UserStore;
    private imsCollection: Collection<Stream>;
    private roomsCollection: Collection<Stream>;
    private allCollection: Collection<Stream>;

    constructor(messageStore: MessageStore, userStore: UserStore) {
        this.messageStore = messageStore;
        this.userStore = userStore;

        // Mock, create 3 streams
        let imOne = new IMStreamImpl({id: demoStreamIds[0]});
        this.streams[demoStreamIds[0]] = imOne;
        let roomOne = new RoomStreamImpl({id: demoStreamIds[0]});
        this.streams[demoStreamIds[1]] = roomOne;
        let roomTwo = new RoomStreamImpl({id: demoStreamIds[0]});
        this.streams[demoStreamIds[2]] = roomTwo;

        this.imsCollection = new CollectionBase<Stream>([imOne]);
        this.roomsCollection = new CollectionBase<Stream>([roomOne, roomTwo]);
        this.allCollection = new CollectionBase<Stream>([imOne, roomOne, roomTwo]);

        // register message listener
        imOne.onNewMessage((message) => {
            messageStore.saveMessage(message);
        });
        roomOne.onNewMessage((message) => {
            messageStore.saveMessage(message);
        });
        roomTwo.onNewMessage((message) => {
            messageStore.saveMessage(message);
        });
    }

    get(id:string) {
        return Promise.resolve(this.streams[id]);
    }

    addStream(stream:Stream): Promise<Stream> {
        this.streams[stream.id] = stream;
        if (stream.type === StreamType.CHATROOM) {
            this.roomsCollection.add(stream);
        } else if (stream.type === StreamType.IM) {
            this.imsCollection.add(stream);
        } else {
            this.allCollection.add(stream);
        }
        return Promise.resolve(stream);
    }

    getStreams(filter?: StreamType) {
        if (filter && filter === StreamType.CHATROOM) {
            return this.roomsCollection;
        } else if (filter && filter === StreamType.IM) {
            return this.imsCollection;
        } else {
            return this.allCollection;
        }
    }
}

export class UserStoreImpl implements UserStore {
    private users: { [key: string]: User }

    constructor() {
        this.users = {};
    }

    get(id:string): Promise<User> {
        return Promise.resolve(this.users[id]);
    }

    findUser(id: string): Promise<User[]> {
        return Promise.resolve([]);
    }
}