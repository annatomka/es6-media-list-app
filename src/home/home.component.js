import { AllMediaListComponent } from '../media-list/all-media-list/all.media.list.compontent';
import { WatchLaterListComponent } from '../media-list/watch-later-list/watch.later.list.component';
import { WatchListService } from '../media-list/watch-later-list/watch.later.list.service';
import { MediaListService } from '../media-list/media.list.service';
import { HomeView } from './home.view';

export class HomeComponent {
    constructor(eventEmitter) {
        this.watchListService = new WatchListService(eventEmitter);
        this.mediaListService = new MediaListService(eventEmitter);
        this.view = new HomeView(this);
        this.allMediaListComponent = new AllMediaListComponent(this,eventEmitter, this.mediaListService);
        this.watchLaterListComponent = new WatchLaterListComponent(this,eventEmitter, this.watchListService);
    }

    activate() {
        this.allMediaListComponent.activate();
        this.watchLaterListComponent.activate();
    }
}
