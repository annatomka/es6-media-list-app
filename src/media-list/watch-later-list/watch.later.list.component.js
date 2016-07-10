import { EVENT_POLLING_RESULT } from '../../app.constants';
import { WatchLaterListView } from './watch.later.list.view';

export class WatchLaterListComponent {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.viewModel = {};
        this.view = new WatchLaterListView(this.viewModel);
    }

    activate() {
        console.log('watch later list component activated');
        this.eventEmitter.on(EVENT_POLLING_RESULT, result => {
            this.onPollingResult(result);
        });
    }

    onPollingResult(result) {
        console.log('result arrived in watch later list component: ', result.length);
        this.view.render();
    }

    render() {
        console.log('watch later list rendered');
    }
}
