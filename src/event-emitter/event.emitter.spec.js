import { EventEmitter } from './event.emitter';

describe('EventEmitter', () => {
    let eventEmitter, eventSubscriberSpy;
    const EVENT_KEY = "dummy event key";

    beforeEach(()=> {
        eventEmitter = new EventEmitter();
        let eventCallbackSpy = jasmine.createSpy('eventCallback');
        eventSubscriberSpy = jasmine.createSpyObj("eventSubscriber", ['eventCallback'])
    });

    describe('on Event', ()=> {
        it('should add event subscriber', () => {
            eventEmitter.on(EVENT_KEY, eventSubscriberSpy.eventCallback);
            let subscribersOnEvent = eventEmitter.onSubscribers[EVENT_KEY];
            expect(subscribersOnEvent).toBeDefined();
            expect(subscribersOnEvent.length).toEqual(1);
        });
    });

    describe('on Emit', ()=> {
        it('should call subscriber on emit event key', () => {
            eventEmitter.on(EVENT_KEY, eventSubscriberSpy.eventCallback);
            let eventParams = "params";
            eventEmitter.emit(EVENT_KEY, eventParams);
            expect(eventSubscriberSpy.eventCallback).toHaveBeenCalledWith(eventParams);
        })
    });
});
