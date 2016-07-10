export class PollingService {
    constructor(config, constants, eventEmitter, ApiService) {
        this.constants = constants;
        this.eventEmitter = eventEmitter;
        this.apiService = ApiService;
        this.pollingIntervalMilliseconds = config.pollingIntervalMilliseconds;
        this.pollingIntervalId = null;
    }

    setPollingIntervalMilliseconds(intervalMs) {
        this.pollingIntervalMilliseconds = intervalMs;
    }

    start() {
        this.pollingIntervalId = setInterval(() => {
            this.apiService.getAllMediaItems().then(result => {
                this.eventEmitter.emit(this.constants.EVENT_POLLING_RESULT, result);
            });
        }, this.pollingIntervalMilliseconds);
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
