import { EVENT_POLLING_RESULT, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';
import { WatchLaterListView } from './watch.later.list.view';
import { WatchLaterListService } from './watch.later.list.service';

export class WatchLaterListComponent {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.viewModel = {};
        this.viewModel.watchListItems = [];
        this.view = new WatchLaterListView(this.viewModel);
        this.watchLaterListService = new WatchLaterListService();
    }

    activate() {
        console.log('watch later list component activated');
        this.eventEmitter.on(EVENT_POLLING_RESULT, result => {
            this.onPollingResult(result);
        });

        this.eventEmitter.on(EVENT_WATCHLIST_ADD, item => {
            this.addItemToWatchList(item);
        });

        this.eventEmitter.on(EVENT_WATCHLIST_REMOVE, item => {
            this.removeItemFromWatchList(item);
        });

        this.viewModel.watchListItems = this.watchLaterListService.getItemsAsArray();
    }

    onPollingResult(result) {
        console.log('result arrived in watch later list component: ', result.length);
        //TODO: syncronize storage, if something is delete we must delete from storage too
        this.view.render();
    }

    addItemToWatchList(item) {
        this.watchLaterListService.add(item);
        this.viewModel.watchListItems = this.watchLaterListService.getItemsAsArray();
        this.view.render();
    }

    removeItemFromWatchList(item) {
        this.watchLaterListService.remove(item);
        this.viewModel.watchListItems = this.watchLaterListService.getItemsAsArray();
        this.view.render();
    }
}
