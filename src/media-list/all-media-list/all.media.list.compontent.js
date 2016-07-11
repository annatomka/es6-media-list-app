import { EVENT_POLLING_RESULT, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';
import { AllMediaListView } from './all.media.list.view';

export class AllMediaListComponent {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.viewModel = {};
        this.view = new AllMediaListView(this.viewModel);
    }

    activate() {
        console.log('all media list component activated');
        this.viewModel.addToWatchLaterList = this.addToWatchLaterList;
        this.eventEmitter.on(EVENT_POLLING_RESULT, result => {
            this.onPollingResult(result);
            let testItem = result[0];
            setTimeout(() => {
                this.eventEmitter.emit(EVENT_WATCHLIST_ADD, testItem);
            }, 5000);

            setTimeout(() => {
                this.eventEmitter.emit(EVENT_WATCHLIST_REMOVE, testItem);
            }, 15000);
        });
    }

    onPollingResult(result) {
        console.log('result arrived in all media list component: ', result.length);
        this.viewModel.items = result;
        this.view.render();
    }

    addToWatchLaterList() {
        console.log("addToWatchLaterList called");
        console.log(this)
    }
}
