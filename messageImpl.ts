import { WallPost, SocialMessage } from './interfaces';

export class WallPostImpl implements WallPost {

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
    }

    toJSON() {}
    toImmutableJS() {}
}

export class SocialMessageImpl implements SocialMessage {
    get(id) {
        return this[id];
    }

    set(id, value) {
        this[id] = value;
    }

    batchUpdate() {
        return null;
    }

    getAttachments() {
        return null;
    }

    onChange(eventName, prop, callback) {
    }

    toJSON() {}
    toImmutableJS() {}
}
