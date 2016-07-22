import { EventEmitter } from './event.emitter';

describe('EventEmitter', () => {
    let eventEmitter, eventSubscriberSpy;
    const EVENT_KEY = "dummy event key";

    beforeEach(()=> {
        eventEmitter = new EventEmitter();
        let eventCallbackSpy = jasmine.createSpy('eventCallback');
        eventSubscriberSpy = jasmine.createSpyObj("eventSubscriber", ['eventCallback'])
    });

    describe('on Event', () => {
        it('should exist', () => {
            expect(eventEmitter.on).toBeDefined();
        });

        it('should add event subscriber', () => {
            eventEmitter.on(EVENT_KEY, eventSubscriberSpy.eventCallback);
            let subscribersOnEvent = eventEmitter.onSubscribers[EVENT_KEY];
            expect(subscribersOnEvent).toBeDefined();
            expect(subscribersOnEvent.length).toEqual(1);
        });

        it('should push event subscriber to the existing array', () => {
            eventEmitter.on(EVENT_KEY, eventSubscriberSpy.eventCallback);
            eventEmitter.on(EVENT_KEY, eventSubscriberSpy.eventCallback);
            let subscribersOnEvent = eventEmitter.onSubscribers[EVENT_KEY];
            expect(subscribersOnEvent).toBeDefined();
            expect(subscribersOnEvent.length).toEqual(2);
        });
    });

    describe('on Emit', ()=> {
        it('should exist', () => {
            expect(eventEmitter.emit).toBeDefined();
        });

        it('should call subscriber on emit event key', () => {
            eventEmitter.on(EVENT_KEY, eventSubscriberSpy.eventCallback);
            let eventParams = "params";
            eventEmitter.emit(EVENT_KEY, eventParams);
            expect(eventSubscriberSpy.eventCallback).toHaveBeenCalledWith(eventParams);
        });

        it('should exit when there is no subscriber', () => {
            let eventParams = "params";
            eventEmitter.emit(EVENT_KEY, eventParams);
            expect(eventSubscriberSpy.eventCallback).not.toHaveBeenCalledWith(eventParams);
        });
    });
});
