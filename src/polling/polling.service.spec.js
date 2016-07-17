import { PollingService } from './polling.service';
import { EVENT_POLLING_INTERVAL_CHANGED } from '../app.constants';

describe('PollingService', () => {
    let eventEmitterSpy, pollingService, apiServiceSpy;
    const EVENT_KEY = "dummy event key";

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
        apiServiceSpy = jasmine.createSpyObj("ApiService", ['getAllMediaItems']);

    });

    describe('constructor', ()=> {
        it('should register restartWithNewIntervalSeconds on EVENT_POLLING_INTERVAL_CHANGED', () => {
            pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
           expect(eventEmitterSpy.on).toHaveBeenCalledWith(EVENT_POLLING_INTERVAL_CHANGED, pollingService.restartWithNewIntervalSeconds);
        });
    });

    describe('setPollingIntervalMilliseconds', ()=>{
        it('should exist', ()=>{
           expect(pollingService.setPollingIntervalMilliseconds).toBeDefined();
        });

       it('should set polling interval ms', ()=>{
           pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
           var newPollingInterval = 120000;
           pollingService.setPollingIntervalMilliseconds(newPollingInterval);
           expect(pollingService.pollingIntervalMilliseconds).toEqual(newPollingInterval);
       })
    });

    describe('start', ()=>{
        beforeEach(()=>{
            jasmine.clock().install();
        });

        afterEach(()=>{
            jasmine.clock().uninstall();
        });

        it('should exist', ()=>{
            pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
            expect(pollingService.start).toBeDefined();
        })

        it('should call poll immediately', ()=>{
            pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
            spyOn(pollingService, 'poll');
            pollingService.start();
            expect(pollingService.poll).toHaveBeenCalled();
            expect(pollingService.poll.calls.count()).toEqual(1);
        });

        it('should call poll after the given interval',()=>{
            pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
            spyOn(pollingService, 'poll');
            pollingService.start();
            expect(pollingService.poll.calls.count()).toEqual(1);
            jasmine.clock().tick(pollingService.pollingIntervalMilliseconds);

            expect(pollingService.poll.calls.count()).toEqual(2);
        });
    });

    describe('poll', ()=>{
        beforeEach(()=>{
                jasmine.clock().install();

            apiServiceSpy.getAllMediaItems.and.callFake(()=>{
                return $.Deferred().promise();
            });
            pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
        });

        afterEach(()=>{
            jasmine.clock().uninstall();
        });

        it('should call api service getAllMediaItems', ()=>{
            pollingService.poll();

            expect(apiServiceSpy.getAllMediaItems).toHaveBeenCalled();
        });

        //it('should call EventEmitter emit', ()=>{
        //    pollingService.poll();
        //    jasmine.clock().tick(100);
        //
        //    expect(eventEmitterSpy.emit).toHaveBeenCalled();
        //
        //
        //});
    });

    describe('stop', ()=>{
        beforeEach(()=>{
            apiServiceSpy.getAllMediaItems.and.callFake(()=>{
                return $.Deferred().promise();
            });
            pollingService = new PollingService(eventEmitterSpy, apiServiceSpy);
        });

        it('should exist', ()=>{
            expect(pollingService.stop).toBeDefined();
        });

        it('should not call clearInterval when there is no polling interval id',() => {
            spyOn(window, 'clearInterval');

            expect(pollingService.pollingIntervalId).toBeNull();
            pollingService.stop();
            expect(window.clearInterval).not.toHaveBeenCalledWith(pollingService.pollingIntervalId);
        });

        it('should call clearInterval when there was polling interval id', ()=>{
            spyOn(window, 'clearInterval');

            pollingService.start();
            expect(pollingService.pollingIntervalId).not.toBeNull();
            let pollingIntervalBeforeStop = pollingService.pollingIntervalId;
            pollingService.stop();
            expect(window.clearInterval).toHaveBeenCalledWith(pollingIntervalBeforeStop);
            expect(pollingService.pollingIntervalId).toBeNull();
        });
    });

    describe('restart', ()=>{
        it('should exist', ()=>{
            expect(pollingService.restart).toBeDefined();
        });

        it('should call stop and start', ()=>{
            spyOn(pollingService, 'start');
            spyOn(pollingService, 'stop');
            pollingService.restart();
            expect(pollingService.stop).toHaveBeenCalled();
            expect(pollingService.start).toHaveBeenCalled();
        });
    });

    describe('restartWithNewIntervalSeconds', ()=>{
        it('should exist', ()=>{
           expect(pollingService.restartWithNewIntervalSeconds).toBeDefined();
        });

        it('should call setPollingIntervalMilliseconds', ()=>{
            let seconds = 40;
            spyOn(pollingService, 'setPollingIntervalMilliseconds');
            pollingService.restartWithNewIntervalSeconds(seconds);
            expect(pollingService.setPollingIntervalMilliseconds).toHaveBeenCalledWith(seconds*1000);
        })
    });
});
