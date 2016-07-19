import { AllMediaListComponent } from './all.media.list.compontent';
import { EVENT_POLLING_RESULT } from '../../app.constants';

describe('AllMediaListComponent', ()=>{
    "use strict";
    let eventEmitterSpy, mediaListService;

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
        mediaListService = jasmine.createSpyObj("MediaListService", ['updateCache', 'getMediaList']);
    });

    describe('activate', ()=>{
        var allMediaListComponent;

        beforeEach(()=>{
            allMediaListComponent = new AllMediaListComponent(eventEmitterSpy, mediaListService);
        });

        it('should call optionsComponent activate', ()=>{
            spyOn(allMediaListComponent.optionsComponent, 'activate');
            allMediaListComponent.activate();
            expect(allMediaListComponent.optionsComponent.activate).toHaveBeenCalled();
        });

        it('should call super activate', ()=>{
            let allMediaComponentSuper = Object.getPrototypeOf(AllMediaListComponent.prototype);
            spyOn(allMediaComponentSuper, 'activate');
            allMediaListComponent.activate();
            expect(allMediaComponentSuper.activate).toHaveBeenCalled();
        });

        it('should register callback to EVENT_POLLING_RESULT event', ()=> {
            spyOn(allMediaListComponent, 'onPollingResult');
            eventEmitterSpy.on.and.callFake((eventKey, callbackFn)=>{
                console.log("spy called ",callbackFn)
                callbackFn();
            });
            allMediaListComponent.activate();
            let dummyItems = [{id: 1, title: 'dummy'}];
            expect(eventEmitterSpy.on).toHaveBeenCalledWith(EVENT_POLLING_RESULT,jasmine.any(Function));

            expect(allMediaListComponent.onPollingResult).toHaveBeenCalled();
        });
    });
});