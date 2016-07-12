import { POLLING_INTERVAL_MS, EVENT_POLLING_RESULT } from '../app.constants';

export class PollingService {
    constructor(eventEmitter, ApiService) {
        this.eventEmitter = eventEmitter;
        this.apiService = ApiService;
        this.pollingIntervalMilliseconds = POLLING_INTERVAL_MS;
        this.pollingIntervalId = null;
    }

    setPollingIntervalMilliseconds(intervalMs) {
        this.pollingIntervalMilliseconds = intervalMs;
    }

    start() {
        this.poll();
        this.pollingIntervalId = setInterval(() => {
            this.poll();
        }, this.pollingIntervalMilliseconds);
    }

    poll() {
        this.apiService.getAllMediaItems().then(result => {
            this.eventEmitter.emit(EVENT_POLLING_RESULT, result);
        });
    }

    restartWithNewIntervalMs(intervalMs) {
        this.setPollingIntervalMilliseconds(intervalMs);
        this.restart();
    }

    restart() {
        this.stop();
        this.start();
    }

    stop() {
        if (this.pollingIntervalId) {
            clearInterval(this.pollingIntervalId);
            this.pollingIntervalId = null;
        }
    }
}
