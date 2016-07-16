import { EventEmitter } from './event.emitter';

describe('EventEmitter', () => {
    let eventEmitter = new EventEmitter();
    const EVENT_KEY = "dummy event key";
    let eventCallbackSpy = jasmine.createSpy('eventCallback');

    beforeEach(()=> {
        let mySubscriber = {
            eventCallback: eventCallbackSpy
        };

        eventEmitter.on(EVENT_KEY, mySubscriber.eventCallback);
    });
    describe('on Event', ()=> {
        it('should add event subscriber', () => {
            let subscribersOnEvent = eventEmitter.onSubscribers[EVENT_KEY];
            expect(subscribersOnEvent).toBeDefined();
            expect(subscribersOnEvent.length).toEqual(1);
        });
    });

    describe('on Emit', ()=> {
        it('should call subscriber on emit event key', () => {
            let eventParams = "params";
            eventEmitter.emit(EVENT_KEY, eventParams);
            expect(eventCallbackSpy).toHaveBeenCalledWith(eventParams);
        })
    });
});
