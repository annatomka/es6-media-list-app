import { AllMediaListComponent } from '../media-list/all-media-list/all.media.list.compontent';
import { WatchLaterListComponent } from '../media-list/watch-later-list/watch.later.list.component';
import { WatchListService } from '../media-list/watch-later-list/watch.later.list.service';
import { MediaListService } from '../media-list/media.list.service';

export class HomeComponent {
    constructor(eventEmitter) {
        this.watchListService = new WatchListService(eventEmitter);
        this.mediaListService = new MediaListService(eventEmitter);
        this.allMediaListComponent = new AllMediaListComponent(eventEmitter, this.mediaListService);
        this.watchLaterListComponent = new WatchLaterListComponent(eventEmitter, this.watchListService);
    }

    activate() {
        this.allMediaListComponent.activate();
        this.watchLaterListComponent.activate();
    }
}
