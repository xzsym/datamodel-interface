import { User, WallPost, Collection, RoomStream, Signal, PrescenceUpdateCallback, Model, ModelEvent, ModelCallback } from '../datamodel';
import { CollectionBase } from './baseImpl';
import { WallPostImpl } from './messageImpl';

class UserImpl implements User {
    props: { [key: string]: any };
    listener: { [key: string]: PrescenceUpdateCallback };
    listenerCount: number;

    constructor(props?: { [key: string]: any }) {
        this.props = props;
        this.listener = {};
        this.listenerCount = 0;
    }

    get id() {
        return this.props.id;
    }

    get active() {
        return this.props.active;
    }
    get companyName() {
        return this.props.companyName;
    }
    get defaultImage() {
        return this.props.defaultImage;
    }
    get entitlements() {
        return this.props.entitlements;
    }
    get firstName() {
        return this.props.firstName;
    }
    get followeeCount() {
        return this.props.followeeCount;
    }
    get isCrossPod() {
        return this.props.isCrossPod;
    }
    get largeImage() {
        return this.props.largeImage;
    }
    get lastName() {
        return this.props.lastName;
    }
    get location() {
        return this.props.location;
    }
    get mediumImage() {
        return this.props.mediumImage;
    }
    get prettyName() {
        return this.props.prettyName;
    }
    get screenName() {
        return this.props.screenName;
    }
    get smallImage() {
        return this.props.smallImage;
    }
    get title() {
        return this.props.title;
    }
    get verifiedForBadge() {
        return this.props.verifiedForBadge;
    }

    getRooms():Promise<Collection<RoomStream>>  {
        const singal = <RoomStream>{};
        const collections = new CollectionBase<RoomStream>();
        collections.add(singal);
        return Promise.resolve(collections);
    }

    getWallPosts(): Promise<Collection<WallPost>> {
        const wallPost = new WallPostImpl({id: 'wallpost1'});
        const collections = new CollectionBase<WallPost>();
        collections.add(wallPost);
        return Promise.resolve(collections);
    }

    getSignals(): Promise<Collection<Signal>> {
        const singal = <Signal>{};
        const collections = new CollectionBase<Signal>();
        collections.add(singal);
        return Promise.resolve(collections);
    }

    addPresenceUpdateListener(callback:PrescenceUpdateCallback): () => void {
        const listenerId = `presence${this.listenerCount}`;
        this.listenerCount += 1;
        this.listener[listenerId] = callback;
        return () => {
            delete this.listener[listenerId];
        };
    }

    onChange(event: ModelEvent, prop: string, changeFunction: ModelCallback<Model>) {

    }

    update(newProps:{[ key: string ]: any}) {
        return Promise.resolve(this);
    }

    toJSON() {
        return this.props;
    }
    toImmutableJS() {
        return {};
    }
};
