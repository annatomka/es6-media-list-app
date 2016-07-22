import { WatchLaterListComponent } from './watch.later.list.component';
import { EVENT_MEDIA_LIST_UPDATED, EVENT_WATCHLIST_ADD, EVENT_WATCHLIST_REMOVE } from '../../app.constants';

describe('WatchLaterListComponent', ()=> {
    "use strict";
    let eventEmitterSpy, watchListServiceSpy;

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
        watchListServiceSpy = jasmine.createSpyObj("WatchListService", ['updateWatchList', 'getWatchList', 'addToWatchList', 'removeFromWatchList']);
    });


    describe('activate', ()=> {
        let watchListComponent;

        beforeEach(()=> {
            watchListComponent = new WatchLaterListComponent(eventEmitterSpy, watchListServiceSpy);
            eventEmitterSpy.on.and.callFake((eventKey, callbackFn)=> {
                callbackFn();
            });
        });

        it('should exist', () => {
            expect(watchListComponent.activate).toBeDefined();
        });

        it('should register event listeners', ()=> {
            watchListComponent.activate();
            expect(eventEmitterSpy.on).toHaveBeenCalledWith(EVENT_MEDIA_LIST_UPDATED, jasmine.any(Function));
            expect(eventEmitterSpy.on).toHaveBeenCalledWith(EVENT_WATCHLIST_ADD, jasmine.any(Function));
            expect(eventEmitterSpy.on).toHaveBeenCalledWith(EVENT_WATCHLIST_REMOVE, jasmine.any(Function));
        });

        it('should call listeners on events', ()=> {
            spyOn(watchListComponent, 'onMediaListUpdated');
            spyOn(watchListComponent, 'addItemToWatchList');
            spyOn(watchListComponent, 'removeItemFromWatchList');
            watchListComponent.activate();

            expect(watchListComponent.onMediaListUpdated).toHaveBeenCalled();
            expect(watchListComponent.addItemToWatchList).toHaveBeenCalled();
            expect(watchListComponent.removeItemFromWatchList).toHaveBeenCalled();
        });
    });

    describe('onMediaListUpdated', () => {
        let watchListComponent;

        beforeEach(()=> {
            watchListComponent = new WatchLaterListComponent(eventEmitterSpy, watchListServiceSpy);
        });

        it('should exist', () => {
            expect(watchListComponent.onMediaListUpdated).toBeDefined();
        });

        it('should update watch list', ()=> {
            var dummyCache = {1: 'dummy'};
            watchListComponent.onMediaListUpdated(dummyCache);
            expect(watchListServiceSpy.updateWatchList).toHaveBeenCalledWith(dummyCache);
        });

        it('should render view', ()=> {
            var dummyCache = {1: 'dummy'};
            spyOn(watchListComponent.view, 'render');
            watchListComponent.onMediaListUpdated(dummyCache);
            expect(watchListComponent.view.render).toHaveBeenCalled();
        });
    });

    describe('addItemToWatchList', ()=> {
        let watchListComponent;

        beforeEach(()=> {
            watchListComponent = new WatchLaterListComponent(eventEmitterSpy, watchListServiceSpy);
        });

        it('should exist', () => {
            expect(watchListComponent.addItemToWatchList).toBeDefined();
        });

        it('should add item to watchlist', ()=> {
            let dummyId = 2;
            let dummyResult = ["dummy"];
            watchListServiceSpy.getWatchList.and.returnValue(dummyResult);
            watchListComponent.addItemToWatchList(dummyId);
            expect(watchListServiceSpy.addToWatchList).toHaveBeenCalledWith(dummyId);
            expect(watchListServiceSpy.getWatchList).toHaveBeenCalled();
            expect(watchListComponent.watchListItems).toEqual(dummyResult);
        });

        it('should render view', ()=> {
            var dummyCache = {1: 'dummy'};
            spyOn(watchListComponent.view, 'render');
            watchListComponent.addItemToWatchList(dummyCache);
            expect(watchListComponent.view.render).toHaveBeenCalled();
        });
    });

    describe('removeItemFromWatchList', ()=> {
        let watchListComponent;

        beforeEach(()=> {
            watchListComponent = new WatchLaterListComponent(eventEmitterSpy, watchListServiceSpy);
        });


        it('should exist', () => {
            expect(watchListComponent.removeItemFromWatchList).toBeDefined();
        });

        it('should render view', ()=> {
            var dummyCache = {1: 'dummy'};
            spyOn(watchListComponent.view, 'render');
            watchListComponent.removeItemFromWatchList(dummyCache);
            expect(watchListComponent.view.render).toHaveBeenCalled();
        });
    });
});