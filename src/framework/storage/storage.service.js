import { STORAGE_PREFIX } from '../framework.constants';

export class StorageService {
    constructor(localStorage) {
        this.localStorage = localStorage;
    }

    add(key, value) {
        this.localStorage.setItem(STORAGE_PREFIX + key, this.serialize(value));
    }

    remove(key) {
        this.localStorage.removeItem(STORAGE_PREFIX + key);
    }

    get(key) {
        const itemInStorage = this.localStorage.getItem(STORAGE_PREFIX + key);
        if (itemInStorage) {
            return this.deserialize(itemInStorage);
        }
    }

    serialize(item) {
        return JSON.stringify(item);
    }

    deserialize(item) {
        return JSON.parse(item);
    }
}
