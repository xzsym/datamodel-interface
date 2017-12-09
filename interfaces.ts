
import { Model, Collection } from './base';


export interface Message extends Model {
}

export interface SocialMessage extends Message {
    getAttachments(): Array<Attachment>;
}

export interface WallPost extends Message {

}

export interface Attachment extends Model {}

interface newMessageCallback {
    (message: Message);
}

export interface Stream extends Model {
    getMessages(from: number, count: number): Array<SocialMessage>;
    getMembers(): Collection<User>;

    uploadAttachment();
    sendMessage();
    onNewMessage(newMessageCallback);
}

export interface User extends Model {
    getWallPosts(): Collection<WallPost>;
}

// ***** Stores *****
export interface Store<T> {
    get(id: string): T;
}

interface StoreDataCallback<T> {
    (data: T, store: Store<T>);
}

interface StreamDataListener<T> {
    onReceiveData(callback:StoreDataCallback<T>);
}

export interface MessageStore extends Store<Message>, StreamDataListener<Message> {
    getMessage(id: string): Message;
}

export interface UserStore extends Store<User> {
    getUser(id: string): User;
}

export interface StreamStore extends Store<Stream> {
    getStream(id: string): Stream;
}

// ****** misc *******
export interface ApplicationSettings {
    setTheme();
}

