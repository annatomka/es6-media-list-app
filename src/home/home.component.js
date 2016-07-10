import { AllMediaListComponent } from '../media-list/all-media-list/all.media.list.compontent';
import { WatchLaterListComponent } from '../media-list/watch-later-list/watch.later.list.component';

export class HomeComponent {
    constructor(eventEmitter) {
        this.allMediaListComponent = new AllMediaListComponent(eventEmitter);
        this.watchLaterListComponent = new WatchLaterListComponent(eventEmitter);
    }

    activate() {
        this.allMediaListComponent.activate();
        this.watchLaterListComponent.activate();
    }
}
