import { StorageService } from '../storage/storage.service';
import { STORAGE_ID_WATCH_LATER, EVENT_MEDIA_LIST_UPDATED, EVENT_POLLING_RESULT } from '../app.constants';

export class MediaListService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.storageService = new StorageService(localStorage);
        this.mediaListCache = {};
        this.init();
    }

    init() {

    }

    updateCache(newMediaList) {
        newMediaList.forEach((newMediaItem)=> {
            this.mediaListCache[newMediaItem.id] = newMediaItem;
        });

        this.eventEmitter.emit(EVENT_MEDIA_LIST_UPDATED, this.mediaListCache);
    }

    getObjectAsArray(objectToTransform) {
        let keys = Object.keys(objectToTransform);
        if (keys.length > 0) {
            return keys.map((key) => {
                return objectToTransform[key];
            });
        }
        return [];
    }
}
