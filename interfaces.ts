
import { Model, Collection } from './base';


export interface Message extends Model {
}

export interface SocialMessage extends Message {
    getAttachments(): Array<Attachment>;
}

export interface WallPost extends Message {

}

export interface Attachment extends Model {}

interface NewMessageCallback {
    (message: Message): void;
}

export interface Stream extends Model {
    getMessages(from: number, count: number): Array<SocialMessage>;
    getMembers(): Collection<User>;

    uploadAttachment(): Promise<Attachment>;
    sendMessage(): Promise<Message>;
    onNewMessage(callback:NewMessageCallback): void;
}

export interface User extends Model {
    getWallPosts(): Collection<WallPost>;
}

// ***** Stores *****
export interface Store<T> {
    get(id: string): T | null;
}

export interface StoreDataCallback<T> {
    (data: T, store: Store<T>): void;
}

interface StreamDataListener<T> {
    onReceiveData(eventName: string, callback:StoreDataCallback<T>): void;
}

export interface MessageStore extends Store<Message>, StreamDataListener<Message> {
    getMessage(id: string): Message | null;
}

export interface UserStore extends Store<User> {
    getUser(id: string): User | null;
}

export interface StreamStore extends Store<Stream> {
    getStream(id: string): Stream | null;
    addStream(stream: Stream): void;
}

// ****** misc *******
export interface ApplicationSettings {
    setTheme(): void;
}

