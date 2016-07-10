export class EventEmitter {
    constructor() {
        this.onSubscribers = {};
    }

    on(eventKey, subscriber) {
        if (!this.onSubscribers.hasOwnProperty(eventKey)) {
            this.onSubscribers[eventKey] = [subscriber];
        } else {
            this.onSubscribers[eventKey].push(subscriber);
        }
    }

    emit(eventKey, data) {
        const subscribers = this.onSubscribers[eventKey];
        if (subscribers && subscribers.length > 0) {
            subscribers.forEach(subscriber => {
                subscriber(data);
            });
        }
    }
}
