import { EVENT_POLLING_RESULT, EVENT_POLLING_INTERVAL_CHANGED } from '../../app.constants';
import { OptionsView } from './options.view';

export class OptionsComponent {
    constructor(mediaListComponent, eventEmitter, mediaListService) {
        this.mediaListComponent = mediaListComponent;
        this.mediaListService = mediaListService;
        this.eventEmitter = eventEmitter;
        this.view = new OptionsView(this);
    }

    onSortByPropertySelectionChanged(newValue) {
        console.log("sort by property changed with value: ", newValue);
        this.mediaListService.updateSortByProperty(newValue);
        this.mediaListComponent.updateMediaList();
    }

    onSortByDirSelectionChanged(newValue) {
        console.log("sort by dir changed with value: ", newValue);
        this.mediaListService.updateSortByDir(newValue);
        this.mediaListComponent.updateMediaList();
    }

    onPollingInputChanged(newValue) {
        console.log("polling interval new value: ", newValue);
        this.eventEmitter.emit(EVENT_POLLING_INTERVAL_CHANGED, newValue)
    }
}
