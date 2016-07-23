import { AllMediaListComponent } from './all.media.list.compontent';
import { EVENT_POLLING_RESULT, EVENT_WATCHLIST_ADD } from '../../app.constants';

describe('AllMediaListComponent', () => {
    let eventEmitterSpy;
    let mediaListService;

    beforeEach(() => {
        eventEmitterSpy = jasmine.createSpyObj('EventEmitter', ['on', 'emit']);
        mediaListService = jasmine.createSpyObj('MediaListService',
            ['updateCache', 'getMediaList']);
    });

    describe('activate', () => {
        let allMediaListComponent;

        beforeEach(() => {
            allMediaListComponent = new AllMediaListComponent(eventEmitterSpy, mediaListService);
        });

        it('should exist', () => {
            expect(allMediaListComponent.activate).toBeDefined();
        });

        it('should call optionsComponent activate', () => {
            spyOn(allMediaListComponent.optionsComponent, 'activate');
            allMediaListComponent.activate();
            expect(allMediaListComponent.optionsComponent.activate).toHaveBeenCalled();
        });

        it('should call super activate', () => {
            const allMediaComponentSuper = Object.getPrototypeOf(AllMediaListComponent.prototype);
            spyOn(allMediaComponentSuper, 'activate');
            allMediaListComponent.activate();
            expect(allMediaComponentSuper.activate).toHaveBeenCalled();
        });

        it('should register callback to EVENT_POLLING_RESULT event', () => {
            spyOn(allMediaListComponent, 'onPollingResult');
            eventEmitterSpy.on.and.callFake((eventKey, callbackFn) => {
                callbackFn();
            });
            allMediaListComponent.activate();
            expect(eventEmitterSpy.on).toHaveBeenCalledWith(
                EVENT_POLLING_RESULT, jasmine.any(Function));
            expect(allMediaListComponent.onPollingResult).toHaveBeenCalled();
        });
    });

    describe('onPollingResult', () => {
        let allMediaListComponent;

        beforeEach(() => {
            allMediaListComponent = new AllMediaListComponent(eventEmitterSpy, mediaListService);
        });

        it('should exist', () => {
            expect(allMediaListComponent.onPollingResult).toBeDefined();
        });

        it('should update media cache', () => {
            const dummyPollingResult = [{ id: 1, title: 'dummy' }];
            spyOn(allMediaListComponent, 'updateMediaList');
            allMediaListComponent.onPollingResult(dummyPollingResult);
            expect(mediaListService.updateCache).toHaveBeenCalledWith(dummyPollingResult);
            expect(allMediaListComponent.updateMediaList).toHaveBeenCalled();
        });
    });

    describe('updateMediaList', () => {
        let allMediaListComponent;

        beforeEach(() => {
            allMediaListComponent = new AllMediaListComponent(eventEmitterSpy, mediaListService);
        });

        it('should exist', () => {
            expect(allMediaListComponent.updateMediaList).toBeDefined();
        });

        it('should update media list', () => {
            const dummyList = [1, 2, 3, 4, 5];
            mediaListService.getMediaList.and.returnValue(dummyList);
            allMediaListComponent.updateMediaList();

            expect(mediaListService.getMediaList).toHaveBeenCalled();
            expect(allMediaListComponent.items).toEqual(dummyList);
        });

        it('should call render', () => {
            spyOn(allMediaListComponent.view, 'render');
            allMediaListComponent.updateMediaList();

            expect(allMediaListComponent.view.render).toHaveBeenCalled();
        });
    });

    describe('addToWatchLaterList', () => {
        let allMediaListComponent;

        beforeEach(() => {
            allMediaListComponent = new AllMediaListComponent(eventEmitterSpy, mediaListService);
        });

        it('should exist', () => {
            expect(allMediaListComponent.addToWatchLaterList).toBeDefined();
        });

        it('should emit EVENT_WATCHLIST_ADD with given id', () => {
            const dummyId = 121;
            allMediaListComponent.addToWatchLaterList(dummyId);
            expect(eventEmitterSpy.emit).toHaveBeenCalledWith(EVENT_WATCHLIST_ADD, dummyId);
        });
    });
});
