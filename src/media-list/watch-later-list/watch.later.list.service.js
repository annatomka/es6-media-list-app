import { StorageService } from '../../storage/storage.service';
import { STORAGE_ID_WATCH_LATER, EVENT_MEDIA_LIST_UPDATED } from '../../app.constants';

export class MediaListService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.storageService = new StorageService(localStorage);
        this.mediaListCache = {};
        this.watchListEntries = [];
        this.init();
    }

    init() {
        this.watchListEntries = this.storageService.get(STORAGE_ID_WATCH_LATER);
        if (!this.watchListEntries) {
            this.watchListEntries = [];
            this.storageService.add(STORAGE_ID_WATCH_LATER, []);
        }
    }

    getWatchList() {
        //TODO: return a list of media items from mediaListCache and watchListEntries
        return this.watchListEntries.map((entry)=>{
            let mediaItem = this.mediaListCache[entry.mediaId];
            mediaItem.addedAt = entry.addedAt;
            return mediaItem;
        });
    }

    updateCache(newMediaList) {
        newMediaList.forEach((newMediaItem)=> {
            this.mediaListCache[newMediaItem.id] = newMediaItem;
        });

        let updatedWatchListEntries = [];
        this.watchListEntries.forEach((entry) => {
            let mediaItem = this.mediaListCache[entry.mediaId];
            if(mediaItem){
                updatedWatchListEntries.push(entry);
            }
        });
        this.watchListEntries = updatedWatchListEntries;
        this.storageService.add(STORAGE_ID_WATCH_LATER, this.watchListEntries);

        this.eventEmitter.emit(EVENT_MEDIA_LIST_UPDATED);
    }

    addToWatchList(id) {
        this.watchListEntries.push({ mediaId: id, addedAt: new Date()});
        this.storageService.add(STORAGE_ID_WATCH_LATER, this.watchListEntries);
    }

    removeFromWatchList(id) {
        this.watchListEntries = this.watchListEntries.filter((entry) => {
            return entry.mediaId !== id;
        });
        this.storageService.add(STORAGE_ID_WATCH_LATER, this.watchListEntries);
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
