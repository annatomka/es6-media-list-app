import { StorageService } from '../../framework/storage/storage.service';
import { EVENT_MEDIA_LIST_UPDATED } from '../app.constants';

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

        this.filterBy = '*';
    }

    updateCache(newMediaList) {
        this.mediaList = newMediaList;
        newMediaList.forEach((newMediaItem) => {
            this.mediaListCache[newMediaItem.id] = newMediaItem;
        });

        this.eventEmitter.emit(EVENT_MEDIA_LIST_UPDATED, this.mediaListCache);
    }

    updateSortByProperty(sortByProperty) {
        this.sortOptions.by = sortByProperty;
        this.sortMediaList();
    }

    updateSortByDir(sortByDir) {
        this.sortOptions.dir = sortByDir;
        this.sortMediaList();
    }

    updateFilterBy(filter) {
        this.filterBy = filter;
        this.filterMediaList();
    }

    filterMediaList() {
        if (this.filterBy !== '*') {
            return this.mediaList.filter((mediaItem) =>
                    (this.filterBy === 'live' && mediaItem.isLive)
                    || (this.filterBy === 'offline' && !mediaItem.isLive)
                    || (this.filterBy === 'video' && mediaItem.type === 'recorded'));
        }
        return this.mediaList;
    }

    getMediaList() {
        this.sortMediaList();
        return this.filterMediaList();
    }

    sortMediaList() {
        this.mediaList.sort((a, b) => this.comparator(a, b));
    }

    comparator(firstMediaItem, secondMediaItem) {
        const firstMediaItemSortProperty = firstMediaItem[this.sortOptions.by];
        const secondMediaItemSortProperty = secondMediaItem[this.sortOptions.by];
        if (firstMediaItemSortProperty < secondMediaItemSortProperty) {
            return -1 * this.sortOptions.dir;
        }
        if (firstMediaItemSortProperty > secondMediaItemSortProperty) {
            return this.sortOptions.dir;
        }

        return 0;
    }
}
