/* eslint-disable no-alert */
import { POLLING_INTERVAL_MS, EVENT_POLLING_RESULT,
    EVENT_POLLING_INTERVAL_CHANGED, POLLING_STOPPED_MESSAGE } from '../app.constants';

export class PollingService {
    constructor(eventEmitter, ApiService) {
        this.eventEmitter = eventEmitter;
        this.apiService = ApiService;
        this.pollingIntervalMilliseconds = POLLING_INTERVAL_MS;
        this.pollingIntervalId = null;
    }

    init() {
        this.eventEmitter.on(EVENT_POLLING_INTERVAL_CHANGED,
            (newIntervalMs) => this.restartWithNewIntervalSeconds(newIntervalMs));
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
        }, () => {
            this.stop();
            alert(POLLING_STOPPED_MESSAGE);
        });
    }

    restartWithNewIntervalSeconds(intervalInSeconds) {
        this.setPollingIntervalMilliseconds(intervalInSeconds * 1000);

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
