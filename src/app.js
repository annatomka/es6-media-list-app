import { ApiService } from './api/api.service';
import { PollingService } from './polling/polling.service';
import { EventEmitter } from './event-emitter/event.emitter';
import { HomeComponent } from './home/home.component';

export class App {
    constructor(jQuery) {
        this.apiService = new ApiService(jQuery);
        this.eventEmitter = new EventEmitter();
        this.pollingService = new PollingService(this.eventEmitter, this.apiService);
        this.homeComponent = new HomeComponent(this.eventEmitter);
    }

    bootstrap() {
        this.pollingService.start();
        this.homeComponent.activate();
    }
}

const app = new App(jQuery);
app.bootstrap();

