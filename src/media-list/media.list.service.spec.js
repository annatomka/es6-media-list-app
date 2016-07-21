import { MediaListService } from './media.list.service';
import { EVENT_MEDIA_LIST_UPDATED } from '../app.constants';

describe('MediaListService', ()=> {
    "use strict";
    let eventEmitterSpy, mediaListService, apiServiceSpy;

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
        apiServiceSpy = jasmine.createSpyObj("ApiService", ['getAllMediaItems']);
    });

    describe('updateCache', ()=> {
        let dummyItem, dummyMediaList;

        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
            dummyItem = {id: 1, value: 'dummy'};
            dummyMediaList = [dummyItem];
        });

        it('should exist', () => {
            expect(mediaListService.updateCache).toBeDefined();
        });

        it('should update mediaList with given list', ()=> {
            mediaListService.updateCache(dummyMediaList);
            expect(mediaListService.mediaList).toEqual(dummyMediaList);
        });

        it('should iterate over mediaList and store item in cache', ()=> {
            mediaListService.updateCache(dummyMediaList);
            expect(mediaListService.mediaListCache[dummyItem.id]).toBeDefined();
            expect(mediaListService.mediaListCache[1]).toEqual(dummyItem);
        });

        it('should emit EVENT_MEDIA_LIST_UPDATED with updated cache', ()=> {
            mediaListService.updateCache(dummyMediaList);
            expect(eventEmitterSpy.emit).toHaveBeenCalledWith(EVENT_MEDIA_LIST_UPDATED, mediaListService.mediaListCache);
        });
    });

    describe('updateSortByProperty', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.updateSortByProperty).toBeDefined();
        });

        it('should update sort by property with the given value', ()=> {
            let sortBy = 'id';
            expect(mediaListService.sortOptions.by).not.toEqual(sortBy);
            mediaListService.updateSortByProperty(sortBy);
            expect(mediaListService.sortOptions.by).toEqual(sortBy);
        });

        it('should call sortMediaList', ()=> {
            let sortBy = 'id';
            spyOn(mediaListService, 'sortMediaList');
            mediaListService.updateSortByProperty(sortBy);
            expect(mediaListService.sortMediaList).toHaveBeenCalled();
        });
    });

    describe('updateSortByDir', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.updateSortByDir).toBeDefined();
        });

        it('should update sort dir property with the given value', ()=> {
            let sortDir = -1;
            expect(mediaListService.sortOptions.dir).not.toEqual(sortDir);
            mediaListService.updateSortByDir(sortDir)
            expect(mediaListService.sortOptions.dir).toEqual(sortDir);
        });

        it('should call sortMediaList', ()=> {
            let sortDir = -1;
            spyOn(mediaListService, 'sortMediaList');
            mediaListService.updateSortByDir(sortDir);
            expect(mediaListService.sortMediaList).toHaveBeenCalled();
        });
    });

    describe('updateFilterBy', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.updateFilterBy).toBeDefined();
        });

        it('should update filter by property with the given value', ()=> {
            let filterBy = 'viewers';
            expect(mediaListService.filterBy).not.toEqual(filterBy);
            mediaListService.updateFilterBy(filterBy);
            expect(mediaListService.filterBy).toEqual(filterBy);
        });

        it('should call filterMediaList', ()=> {
            let filterBy = 'viewers';
            spyOn(mediaListService, 'filterMediaList');
            mediaListService.updateFilterBy(filterBy);
            expect(mediaListService.filterMediaList).toHaveBeenCalled();
        });
    });

    describe('sortMediaList', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', ()=> {
            expect(mediaListService.sortMediaList).toBeDefined();
        });

        it('should call mediaList sort function', ()=> {
            spyOn(mediaListService.mediaList, 'sort');
            mediaListService.sortMediaList();
            expect(mediaListService.mediaList.sort).toHaveBeenCalled();//TODO: call with comparator??
        });
    });

    describe('filterMediaList', ()=> {
        let filterBy, dummyMediaList = [{
            id: 1,
            isLive: false,
            type: 'recorded'
        },
            {
                id: 2,
                isLive: true,
                type: 'channel'
            }];

        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
            mediaListService.updateCache(dummyMediaList);
            filterBy = '';

        });

        it('should exist', ()=> {
            expect(mediaListService.filterMediaList).toBeDefined();
        });

        it('should return all media when filterBy is *', ()=> {
            mediaListService.filterBy = '*';
            let filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).toEqual(dummyMediaList);
        });

        it('should return live items only when filterBy equals live', ()=> {
            mediaListService.filterBy = 'live';
            let filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).not.toEqual(dummyMediaList);
            expect(filteredItems.length).toEqual(1);
            expect(filteredItems[0]).toEqual(dummyMediaList[1]);
        });

        it('should return offline items only when filterBy equals offline', ()=> {
            mediaListService.filterBy = 'offline';
            let filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).not.toEqual(dummyMediaList);
            expect(filteredItems.length).toEqual(1);
            expect(filteredItems[0]).toEqual(dummyMediaList[0]);
        });

        it('should return video items only when filterBy equals video', ()=> {
            mediaListService.filterBy = 'video';
            let filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).not.toEqual(dummyMediaList);
            expect(filteredItems.length).toEqual(1);
            expect(filteredItems[0]).toEqual(dummyMediaList[0]);
        });
    });

    describe('getMediaList', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', ()=> {
            expect(mediaListService.getMediaList).toBeDefined();
        });

        it('should call sortMediaList', ()=> {
            spyOn(mediaListService, 'sortMediaList');
            mediaListService.getMediaList();
            expect(mediaListService.sortMediaList).toHaveBeenCalled();
        });

        it('should call filterMediaList', ()=> {
            spyOn(mediaListService, 'filterMediaList');
            mediaListService.getMediaList();
            expect(mediaListService.filterMediaList).toHaveBeenCalled();
        });

        it('should result filterMediaList result', ()=> {
            let dummyResult = 'dummy string';
            spyOn(mediaListService, 'filterMediaList').and.callFake(()=> {
                return dummyResult;
            });

            let getMediaListResult = mediaListService.getMediaList();
            expect(getMediaListResult).toEqual(dummyResult);
        });
    });

    describe('getObjectAsArray', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', ()=> {
            expect(mediaListService.getObjectAsArray).toBeDefined();
        });

        it('should return object as array', ()=> {
            let objectToTransform = {1: 'dummy 1', 2: 'dummy 2'};
            let expectedResult = ['dummy 1', 'dummy 2'];
            let getObjectAsArrayResult = mediaListService.getObjectAsArray(objectToTransform);
            expect(getObjectAsArrayResult).toEqual(expectedResult);
        });

        it('should return empty array on empty object', ()=> {
            let objectToTransform = {};
            let expectedResult = [];
            let getObjectAsArrayResult = mediaListService.getObjectAsArray(objectToTransform);
            expect(getObjectAsArrayResult).toEqual(expectedResult);
        });
    });

    describe('comparator', ()=> {
        beforeEach(()=> {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        //TODO:
    });
});