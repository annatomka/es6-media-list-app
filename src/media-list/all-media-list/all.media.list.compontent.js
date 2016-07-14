import { EVENT_POLLING_RESULT, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';
import { AllMediaListView } from './all.media.list.view';
import { OptionsComponent } from '../options-panel/options.panel.component';

export class AllMediaListComponent {
    constructor(parentComponent, eventEmitter, mediaListService) {
        this.eventEmitter = eventEmitter;
        this.parent = parentComponent;
        this.mediaListService = mediaListService;
        this.items = [];
        this.optionsComponent = new OptionsComponent(this,eventEmitter,mediaListService);
        this.view = new AllMediaListView(this);
    }

    activate() {
        this.eventEmitter.on(EVENT_POLLING_RESULT, result => {
            this.onPollingResult(result);
        });
    }

    onPollingResult(result) {
        this.mediaListService.updateCache(result);
        this.updateMediaList();
    }

    updateMediaList() {
        this.items = this.mediaListService.getMediaList();
        this.view.render();
    }

    addToWatchLaterList(mediaId) {
        this.eventEmitter.emit(EVENT_WATCHLIST_ADD, mediaId);
    }
}
