import { User, Stream, SocialMessage, Message, Attachment, StreamType, StreamSettings, NewMessageCallback, IMStream, RoomStream } from '../datamodel';
import { Model, ModelCallback, ModelEvent, Collection } from '../base';
import { CollectionBase } from './baseImpl';
import { SocialMessageImpl } from './messageImpl';
import { Transport } from './requests';

export class StreamImpl implements Stream {
    type: StreamType;
    default: true;
    notificationType: '';
    showToast: true;
    blinkToast: true;
    persistToast: true;
    playSound: true;
    toastColor: '#333';
    xpodDisclaimerCompleted: true;
    alias: 'alias';
    aliasColor: '#bbb';

    private props: { [key: string]: any };
    private listeners: { [key: string]: NewMessageCallback};
    private messages: Message[];
    private listnersCount = 0;

    constructor(props: { [key: string]: any }) {
        this.props = props;
        this.listeners = {};
        this.messages = [];
    }

    get id() {
        return this.props.id;
    }

    get isCrossPod() {
        return this.props.isCrossPod;
    }

    get streamSettings() {
        return this.props.streamSettings;
    }

    getMessages(from: number | null, to: number | null, count: number): Promise<Message[]> {
        // TODO: add mock implementation to consider from/to parameter
        return Promise.resolve(this.messages);
    }

    getMembers(): Promise<Collection<User>> {
        // TODO: add mock implementation
        let userCollection = <Collection<User>>{};
        // TODO: should listen to user added stream event
        return Promise.resolve(userCollection);
    }

    update(settings: StreamSettings) {
        return Promise.resolve(this);
    }

    onChange(event: ModelEvent, prop: string, changeFunction: ModelCallback<Model>) {
        // Demo: ignore stream updates here
    }

    sendReceipt(messages: Message[]) {
        return Transport.execute('SendReceipt', { messages });
    }

    uploadAttachment(attachment: Attachment) {
        // TODO: send to network
        return Promise.resolve(attachment);
    }

    sendMessage(message: Message) {
        this.storeMessage(message);
        // TODO: send to network
        return Promise.resolve(message);
    }

    addNewMessageListener(callback: NewMessageCallback) {
        let lisnterId = `listener${this.listnersCount}`;
        this.listeners[lisnterId] = callback;
        this.listnersCount += 1;
        return () => {
            delete this.listeners[lisnterId];
        }
    }

    toJSON() {
        return this.props;
    }
    toImmutableJS() {
        return {};
    }

    // instance functions specific for StreamImpl
    storeMessage(message: Message) {
        // TODO: compare the time span to put the message into right spot
        // for now, always assume the message is the latest.
        this.messages.push(message);
        for (let key in this.listeners) {
            this.listeners[key](message);
        }

        console.log(`Stream ${this.id} has messages:`, message);
    }
}

export class IMStreamImpl extends StreamImpl implements IMStream {
    type: StreamType.IM;
}

export class RoomStreamImpl extends StreamImpl implements RoomStream {
    type: StreamType.CHATROOM;
}
