import { User, WallPost } from './interfaces';
import { CollectionBase } from './baseImpl';
import { WallPostModel } from './message'

class UserModel implements User {
    model: Object;

    constructor(model?: Object) {
        this.model = model;
    }

    getWallPosts() {
        const wallPost = new WallPostModel();
        const collections = new CollectionBase<WallPost>();
        collections.add(wallPost);
        return collections;
    }

    get(id) {
        return this[id];
    }

    set(id, value) {
        this[id] = value;
    }

    batchUpdate() {
        return null;
    }

    onChange(eventName, prop, callback) {
        callback(this);
    }

    toJSON() {}
    toImmutableJS() {}
};

const user = new UserModel('Joe');
