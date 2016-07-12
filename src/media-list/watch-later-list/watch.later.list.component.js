import { EVENT_MEDIA_LIST_UPDATED, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';
import { WatchLaterListView } from './watch.later.list.view';
import { MediaListService } from './watch.later.list.service';

export class WatchLaterListComponent {
    constructor(eventEmitter, mediaListService) {
        this.eventEmitter = eventEmitter;
        this.watchListItems = [];
        this.view = new WatchLaterListView(this);
        this.mediaListService = mediaListService;
    }

    activate() {
        console.log('watch later list component activated');
        this.eventEmitter.on(EVENT_MEDIA_LIST_UPDATED, () => {
            this.onMediaListUpdated();
        });

        this.eventEmitter.on(EVENT_WATCHLIST_ADD, item => {
            this.addItemToWatchList(item);
        });

        this.eventEmitter.on(EVENT_WATCHLIST_REMOVE, item => {
            this.removeItemFromWatchList(item);
        });

        //this.watchListItems = this.mediaListService.getWatchList();
    }

    onMediaListUpdated(result) {
        console.log('result arrived in watch later list component: ');
        //TODO: syncronize storage, if something is delete we must delete from storage too
        this.watchListItems = this.mediaListService.getWatchList();
        this.view.render();
    }

    addItemToWatchList(id) {
        this.mediaListService.addToWatchList(id);
        this.watchListItems = this.mediaListService.getWatchList();
        console.log(this.watchListItems);
        this.view.render();
    }

    removeItemFromWatchList(id) {
        this.mediaListService.removeFromWatchList(id);
        this.watchListItems = this.mediaListService.getWatchList();
        this.view.render();
    }
}
