
import { Model, Collection } from './base';

enum PersistanceStatus {
    CREATED = "CREATED",
    CREATING = "CREATING",
    FAILED = "FAILED",
}

enum MessageType {
    MAESTRO = "MAESTRO",
    SOCIALMESSAGE = "SOCIALMESSAGE"
}

export interface WritableMessageProps {
}

export interface Message extends Model {
    readonly id: string;
    clientId: string;
    streamId: string;
    ingestionDate: number;
    messageType: string;
    // dateStamp: number;
    // persistenceStatus: string;
    update(modelProps:WritableMessageProps): Promise<Message>;
}

enum MaestroEvent {
    CREATE_ROOM = "CREATE_ROOM",
    JOIN_ROOM = "JOIN_ROOM",
}

export interface MestroMessage extends Message {
    event: MaestroEvent;
    maestroObject: Object; //TODO: define interface for it
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
    isChime: boolean;
    isHighlighted: boolean;
    isReadByMe: boolean;
    isReadByOthers: boolean;
    isSuppressed: boolean;
    // jsonMedia: any[];
    // oboDelegateId: string | null;
    // semVersion: string;
    // shareMessageId: string | null;
    // smallImage: string | null;
    // socialStatus: object;
    text: string;
    userId: number;
    userPrettyName: string;
    userVerifiedForBadge: boolean;
}

export interface WallPost extends Message {
    like(): Promise<WallPost>;
    share(comment:string): Promise<WallPost>;
}

enum ImageType {
    JPEG = "image/jpeg",
    PNG = "image/png",
}

enum AttachmentStatus {
    NOT_DOWNLOADED = "NOT_DOWNLOADED",
    DOWNLOADED = "DOWNLOADED"
}

export interface Attachment extends Model {
    fileId: string;
    encrypted: boolean;
    name: string;
    images: { [key: string]: string };
    width: number;
    height: number;
    orientation: number | null;
    canPreview: boolean;
    sizeInBytes: number;
    contentType: ImageType;
    isCollapsed: boolean;
    thumbnailBlob: string;
    previewBlob: string;
    statue: AttachmentStatus;
    previewStatus: AttachmentStatus;
}

interface NewMessageCallback {
    (message: Message): void;
}

enum StreamType {
    CHATROOM = "CHATROOM",
    IM = "IM/MIM",
}

export interface StreamSettings {
    default: boolean;
    notificationType: string;
    showToast: boolean;
    blinkToast: boolean;
    persistToast: boolean;
    playSound: boolean;
    toastColor: string;
    // audioBridgeNumber: string | null;
    // accessCode: string | null;
    // emailDelivery: string | null;
    xpodDisclaimerCompleted: boolean;
    alias: string;
    aliasColor: string;
    // applyToAlert: boolean;
    // applyToBackground: boolean;
}

export interface Stream extends Model, StreamSettings {
    readonly id: string;
    type: StreamType;
    isCrossPod: boolean;
    streamSettings: StreamSettings;

    getMessages(from: number | null, to: number | null, count: number): Promise<Message[]>;
    getMembers(): Promise<Collection<User>>;

    update(settings: StreamSettings): Promise<Stream>;
    sendReceipt(messages:Message[]): Promise<object>;
    uploadAttachment(attachment:Attachment): Promise<Attachment>;
    sendMessage(message:Message): Promise<Message>;

    onNewMessage(callback:NewMessageCallback): void;
}

export interface IMStream extends Stream {
    type: StreamType.IM;
}
export interface RoomStream extends Stream {
    type: StreamType.CHATROOM;
}

enum RuleType {
    KEYWORD = "KEYWORD"
}

export interface Rule {
    // attributes: string | null;
    // connectorId: string;
    createDate: number;
    definitionType: RuleType;
    id: string;
    // imageUrl: string | null;
    // imageUrlSmall: string | null;
    text: string;
}

export interface FilterRoleGroup {
    operator: string;
    rules: Rule[];
}

export interface Filter {
    readonly id: string;
    name: string;

    getMessages(to: number, count: number): Promise<SocialMessage[]>;
}

export interface Mention extends Filter {
}

export interface Signal extends Filter {
    roleGroup: FilterRoleGroup;
    createDate: number;
}

enum PresenceStatus {
    Avaialable = "Available",
    Away = "Away",
    InAMeeting = "In a meeting",
    BeRightBack = "Be right back",
    OffWork = "Off work",
    Busy = "Busy",
    OutOfOffice = "Out of office"
}

export interface PrescenceUpdateCallback {
    (status: PresenceStatus):void;
}

export interface Entitlement {
    isExternalIMEnabled: boolean;
    isExternalRoomEnabled: boolean;
    canJoinMultiLateralRoom: boolean;
    canCreateMultiLateralRoom: boolean;
}

export interface User extends Model {
    readonly id: number;
    active: boolean;
    companyName: string;
    defaultImage: string;
    entitlements: Entitlement[];
    firstName: string;
    followeeCount: number;
    isCrossPod: boolean;
    largeImage: string;
    lastName: string;
    location: string;
    mediumImage: string;
    prettyName: string;
    // profileData: object;
    // profileThreadId: string;
    screenName: string;
    smallImage: string;
    title: string;
    verifiedForBadge: boolean;

    getWallPosts(): Collection<WallPost>;
    getRooms(): Promise<RoomStream[]>;
    getSignals(): Promise<Signal[]>;
    onPresenceUpdated(callback:PrescenceUpdateCallback):void;
}

// ***** Stores *****
export interface Store<T> {
    get(id: string): T | null;
}

// export interface StoreDataCallback<T> {
//     (data: T, store: Store<T>): void;
// }

// interface StreamDataListener<T> {
//     onReceiveData(eventName: string, callback:StoreDataCallback<T>): void;
// }

// export interface MessageStore extends Store<Message>, StreamDataListener<Message> {
//     getMessage(id: string): Message | null;
// }

export interface UserStore extends Store<User> {
    getUser(id: string): Promise<User | null>;
    findUser(name:string): Promise<User[]>;
}

export interface StreamStore extends Store<Stream> {
    getStream(id: string): Stream | null;
    addStream(stream: Stream): Promise<Stream>;
}

// ****** misc *******
export interface ApplicationSettings {
    setTheme(): void;
}