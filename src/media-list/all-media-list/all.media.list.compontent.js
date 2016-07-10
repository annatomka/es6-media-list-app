import { EVENT_POLLING_RESULT } from '../../app.constants';
import { AllMediaListView } from './all.media.list.view';

export class AllMediaListComponent {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
        this.viewModel = {};
        this.view = new AllMediaListView(this.viewModel);
    }

    activate() {
        console.log('all media list component activated');
        this.eventEmitter.on(EVENT_POLLING_RESULT, result => {
            this.onPollingResult(result);
        });
    }

    onPollingResult(result) {
        console.log('result arrived in all media list component: ', result.length);
        this.viewModel.items = result;
        this.view.render();
    }
}
