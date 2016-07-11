import { StorageService } from '../../storage/storage.service';
import { STORAGE_ID_WATCH_LATER } from '../../app.constants';

export class WatchLaterListService {
    constructor() {
        this.storageService = new StorageService(localStorage);
        this.watchItemsStorage = {};
        this.initStorage();
    }

    initStorage() {
        this.watchItemsStorage = this.storageService.get(STORAGE_ID_WATCH_LATER);
        if (!this.watchItemsStorage) {
            this.watchItemsStorage = {};
            this.storageService.add(STORAGE_ID_WATCH_LATER, {});
        }
    }

    add(item) {
        this.watchItemsStorage[item.id] = item;
        this.storageService.add(STORAGE_ID_WATCH_LATER, this.watchItemsStorage);
    }

    remove(item) {
        delete this.watchItemsStorage[item.id];
        this.storageService.add(STORAGE_ID_WATCH_LATER, this.watchItemsStorage);
    }

    getItemsAsArray() {
        debugger;
        let keys = Object.keys(this.watchItemsStorage);
        if (keys.length > 0) {
            return keys.map((key) => {
                return this.watchItemsStorage[key];
            });
        }
        return [];
    }
}
