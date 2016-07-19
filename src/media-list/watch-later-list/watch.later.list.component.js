import { EVENT_MEDIA_LIST_UPDATED, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';
import { WatchLaterListView } from './watch.later.list.view';
import { Component } from '../../component/component';

export class WatchLaterListComponent extends Component{
    constructor(eventEmitter, watchListService) {
        super();
        this.eventEmitter = eventEmitter;
        this.watchListItems = [];
        this.mediaListCache = {};
        this.view = new WatchLaterListView(this);
        this.watchListService = watchListService;
    }

    activate() {
        super.activate();
        this.eventEmitter.on(EVENT_MEDIA_LIST_UPDATED, (mediaListCache) => {
            this.onMediaListUpdated(mediaListCache);
        });

        this.eventEmitter.on(EVENT_WATCHLIST_ADD, item => {
            this.addItemToWatchList(item);
        });

        this.eventEmitter.on(EVENT_WATCHLIST_REMOVE, item => {
            this.removeItemFromWatchList(item);
        });
    }

    onMediaListUpdated(mediaListCache) {
        this.watchListService.updateWatchList(mediaListCache);
        this.watchListItems = this.watchListService.getWatchList();
        this.view.render();
    }

    addItemToWatchList(id) {
        this.watchListService.addToWatchList(id);
        this.watchListItems = this.watchListService.getWatchList();
        this.view.render();
    }

    removeItemFromWatchList(id) {
        this.watchListService.removeFromWatchList(id);
        this.watchListItems = this.watchListService.getWatchList();
        this.view.render();
    }
}
