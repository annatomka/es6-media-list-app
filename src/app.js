import { config } from './config';
import { constants } from './app.constants';
import { ApiService } from './api/api.service';
import { PollingService } from './polling/polling.service';
import { EventEmitter } from './event-emitter/event.emitter';

class App {
    constructor() {
        this.apiService = new ApiService(config, jQuery);
        this.eventEmitter = new EventEmitter();
        this.pollingService = new PollingService(config, constants, this.eventEmitter, this.apiService);
    }

    bootstrap() {
        this.pollingService.start();
        this.eventEmitter.on(constants.EVENT_POLLING_RESULT, result => {
            console.log('result arrived ', result);
        });
    }
}

const app = new App();
app.bootstrap();
