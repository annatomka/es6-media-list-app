import { EVENT_POLLING_RESULT, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';
import { OptionsView } from './options.view';

export class OptionsComponent {
    constructor(mediaListComponent, eventEmitter, mediaListService) {
        this.mediaListComponent = mediaListComponent;
        this.mediaListService = mediaListService;
        this.view = new OptionsView(this);
    }

    onSortByPropertySelectionChanged(newValue) {
        console.log("sort by property changed with value: ",newValue);
        this.mediaListService.updateSortByProperty(newValue);
        this.mediaListComponent.updateMediaList();
    }

    onSortByDirSelectionChanged(newValue) {
        console.log("sort by dir changed with value: ", newValue);
        this.mediaListService.updateSortByDir(newValue);
        this.mediaListComponent.updateMediaList();
    }

    inputTest(newValue) {
        console.log("input test new value: ",newValue)
    }
}
