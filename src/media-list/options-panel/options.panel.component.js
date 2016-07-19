import { EVENT_POLLING_RESULT, EVENT_POLLING_INTERVAL_CHANGED } from '../../app.constants';
import { OptionsView } from './options.view';
import {Component} from '../../component/component';


export class OptionsComponent extends Component{
    constructor(mediaListComponent, eventEmitter, mediaListService) {
        super();
        this.mediaListComponent = mediaListComponent;
        this.mediaListService = mediaListService;
        this.eventEmitter = eventEmitter;
        this.view = new OptionsView(this);
    }

    onSortByPropertySelectionChanged(newValue) {
        this.mediaListService.updateSortByProperty(newValue);
        this.mediaListComponent.updateMediaList();
    }

    onSortByDirSelectionChanged(newValue) {
        this.mediaListService.updateSortByDir(newValue);
        this.mediaListComponent.updateMediaList(this.mediaListService.mediaList);
    }

    onFilterSelectionChanged(newValue){
        const filteredMediaList = this.mediaListService.updateFilterBy(newValue);
        this.mediaListComponent.updateMediaList(filteredMediaList);
    }

    onPollingInputChanged(newValue) {
        this.eventEmitter.emit(EVENT_POLLING_INTERVAL_CHANGED, newValue);
    }
}
