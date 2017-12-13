
import { Model, Collection } from './base';


export interface Message extends Model {
    clientId: string;
    streamId: string;
    ingestionDate: number;
    // dateStamp: number;
    // messageType: string;
    // persistenceStatus: string;    
}

export interface MestroMessage extends Message {
    event: string;
}

export interface SocialMessage extends Message {
    attachments: Attachment[];
    // codeMedia: any[];
    // customEntities: any[];
    // displayType: string;
    // entities: object;
    // externalOrigination: boolean;
    // format: string;
    // ignoreDLPWarning: boolean;
    // images: object;
    // isChime: boolean;
    // isHighlighted: boolean;
    // isReadByMe: boolean;
    // isReadByOthers: boolean;
    // isSuppressed: boolean;
    // jsonMedia: any[];
    // oboDelegateId: string | null;
    // semVersion: string;
    // shareMessageId: string | null;
    // smallImage: string | null;
    // socialStatus: object;
    // text: string;
    // userId: number;
    // userPrettyName: string;
    // userVerifiedForBadge: boolean;
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
    sendReceipt(messages:Message[]): Promise<object>;

    uploadAttachment(attachment:Attachment): Promise<Attachment>;
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
    messageStore: MessageStore;
    userStore: UserStore;
    getStream(id: string): Stream | null;
    addStream(stream: Stream): void;
}

// ****** misc *******
export interface ApplicationSettings {
    setTheme(): void;
}

