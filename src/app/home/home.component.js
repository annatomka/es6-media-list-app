import { Component } from '../../framework/component/component';
import { AllMediaListComponent } from '../media-list/all-media-list/all.media.list.compontent';
import { WatchLaterListComponent } from '../media-list/watch-later-list/watch.later.list.component';
import { WatchListService } from '../media-list/watch-later-list/watch.later.list.service';
import { MediaListService } from '../media-list/media.list.service';
import { StorageService } from '../../framework/storage/storage.service';
import { HomeView } from './home.view';

export class HomeComponent extends Component {
    constructor(eventEmitter) {
        super();
        this.watchListService = new WatchListService(
            eventEmitter, new StorageService(localStorage));
        this.mediaListService = new MediaListService(eventEmitter);
        this.view = new HomeView(this);
        this.allMediaListComponent = new AllMediaListComponent(eventEmitter, this.mediaListService);
        this.watchLaterListComponent = new WatchLaterListComponent(
            eventEmitter, this.watchListService);
    }

    activate() {
        super.activate(jQuery('#home'));
        this.allMediaListComponent.activate();
        this.watchLaterListComponent.activate();
    }
}
