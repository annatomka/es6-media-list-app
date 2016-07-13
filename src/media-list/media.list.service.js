import { StorageService } from '../storage/storage.service';
import { STORAGE_ID_WATCH_LATER, EVENT_MEDIA_LIST_UPDATED, EVENT_POLLING_RESULT } from '../app.constants';

export class MediaListService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.storageService = new StorageService(localStorage);
        this.mediaList = [];
        this.mediaListCache = {};
        this.sortOptions = {
            by: 'title',
            dir: 1
        };

        this.init();
    }

    init() {

    }

    updateCache(newMediaList) {
        this.mediaList = newMediaList;
        newMediaList.forEach((newMediaItem)=> {
            this.mediaListCache[newMediaItem.id] = newMediaItem;
        });

        this.sortMediaList();
        this.eventEmitter.emit(EVENT_MEDIA_LIST_UPDATED, this.mediaListCache);
    }

    updateSortByProperty(sortByProperty) {
        console.log("sort by ", sortByProperty);
        this.sortOptions.by = sortByProperty;
        this.sortMediaList();
    }

    updateSortByDir(sortByDir) {
        console.log("sort by dir", sortByDir);
        this.sortOptions.dir = sortByDir;
        this.sortMediaList();
    }

    sortMediaList() {

        this.mediaList.sort((a, b) => this.comparator(a, b));
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

    comparator(a, b) {
        var nameA = a[this.sortOptions.by]; // ignore upper and lowercase
        var nameB = b[this.sortOptions.by]; // ignore upper and lowercase
        if (nameA < nameB) {
            return -1 * this.sortOptions.dir;
        }
        if (nameA > nameB) {
            return 1 * this.sortOptions.dir;
        }

        // names must be equal
        return 0;
    }
}
