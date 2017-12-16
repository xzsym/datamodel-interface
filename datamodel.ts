
import { Model, Collection } from './base';

export enum PersistanceStatus {
    CREATED = "CREATED",
    CREATING = "CREATING",
    FAILED = "FAILED",
}

export enum MessageType {
    MAESTRO = "MAESTRO",
    SOCIALMESSAGE = "SOCIALMESSAGE"
}

// The idea of creating the WritableMessageProps is to type check
// the parameters passed into the update method of Model subclass
// If the Model subclass has extra props, then extends the WritableMessageProps
// to add custom props there.
export interface WritableMessageProps {
}

export interface Message extends Model {
    clientId: string;
    streamId: string;
    ingestionDate: number;
    messageType: string;
    // dateStamp: number;
    // persistenceStatus: string;
    update(modelProps:WritableMessageProps): Promise<Message>;
}

export enum MaestroEvent {
    CREATE_ROOM = "CREATE_ROOM",
    JOIN_ROOM = "JOIN_ROOM",
}

export interface MaestroMessage extends Message {
    event: MaestroEvent;
    maestroObject: Object; //TODO: define interface for it
}

export interface WritableSocialMessageProps extends WritableMessageProps {
    userPrettyName: string;
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
    // userVerifiedForBadge: boolean;
    update(modelProps: WritableSocialMessageProps): Promise<SocialMessage>;
}

export interface WritableWallPostMessageProps extends WritableMessageProps {
    text?: string;
}

export interface WallPost extends Message {
    like(): Promise<WallPost>;
    share(comment:string): Promise<WallPost>;
    update(modelProps: WritableWallPostMessageProps): Promise<WallPost>;
}

export enum ImageType {
    JPEG = "image/jpeg",
    PNG = "image/png",
    // TODO: add more types here
}

export enum AttachmentStatus {
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

export interface NewMessageCallback {
    (message: Message): void;
}

export enum StreamType {
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
    type: StreamType;
    isCrossPod: boolean;
    streamSettings: StreamSettings;

    getMessages(from: number | null, to: number | null, count: number): Promise<Message[]>;
    // Use the Collection<User> to monitoring the adding/deleting the users
    getMembers(): Promise<Collection<User>>;

    update(settings: StreamSettings): Promise<Stream>;
    sendReceipt(messages:Message[]): Promise<object>;
    uploadAttachment(attachment:Attachment): Promise<Attachment>;
    sendMessage(message:Message): Promise<Message>;

    addNewMessageListener(callback:NewMessageCallback): () => void;
}

export interface IMStream extends Stream {
    type: StreamType.IM;
}
export interface RoomStream extends Stream {
    type: StreamType.CHATROOM;
}

export enum RuleType {
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

export interface Filter extends Model {
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

    getWallPosts(): Promise<Collection<WallPost>>;
    getRooms(): Promise<Collection<RoomStream>>;
    getSignals(): Promise<Collection<Signal>>;
    addPresenceUpdateListener(callback:PrescenceUpdateCallback): () => void;
}

// ***** Stores *****
export interface Store<T> {
    get(id: string): Promise<T | null>;
}

export interface UserStore extends Store<User> {
    findUser(name:string): Promise<User[]>;
}

export interface StreamStore extends Store<Stream> {
    addStream(stream: Stream): Promise<Stream>;
    getStreams(filter?:StreamType): Collection<Stream>;
}

// ****** misc *******
export interface ApplicationSettings {
    setTheme(): void;
}

export * from './base';