export class PollingService {
    constructor(config) {
        this.pollingIntervalMilliseconds = config.pollingIntervalMilliseconds;
    }
    setPollingIntervalMilliseconds(intervalMs) {
        this.pollingIntervalMilliseconds = intervalMs;
    }
}
