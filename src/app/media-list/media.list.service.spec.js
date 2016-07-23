import { MediaListService } from './media.list.service';
import { EVENT_MEDIA_LIST_UPDATED } from '../app.constants';

describe('MediaListService', () => {
    let eventEmitterSpy;
    let mediaListService;

    beforeEach(() => {
        eventEmitterSpy = jasmine.createSpyObj('EventEmitter', ['on', 'emit']);
    });

    describe('updateCache', () => {
        let dummyItem;
        let dummyMediaList;

        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
            dummyItem = { id: 1, value: 'dummy' };
            dummyMediaList = [dummyItem];
        });

        it('should exist', () => {
            expect(mediaListService.updateCache).toBeDefined();
        });

        it('should update mediaList with given list', () => {
            mediaListService.updateCache(dummyMediaList);
            expect(mediaListService.mediaList).toEqual(dummyMediaList);
        });

        it('should iterate over mediaList and store item in cache', () => {
            mediaListService.updateCache(dummyMediaList);
            expect(mediaListService.mediaListCache[dummyItem.id]).toBeDefined();
            expect(mediaListService.mediaListCache[1]).toEqual(dummyItem);
        });

        it('should emit EVENT_MEDIA_LIST_UPDATED with updated cache', () => {
            mediaListService.updateCache(dummyMediaList);
            expect(eventEmitterSpy.emit)
                .toHaveBeenCalledWith(EVENT_MEDIA_LIST_UPDATED, mediaListService.mediaListCache);
        });
    });

    describe('updateSortByProperty', () => {
        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.updateSortByProperty).toBeDefined();
        });

        it('should update sort by property with the given value', () => {
            const sortBy = 'id';
            expect(mediaListService.sortOptions.by).not.toEqual(sortBy);
            mediaListService.updateSortByProperty(sortBy);
            expect(mediaListService.sortOptions.by).toEqual(sortBy);
        });

        it('should call sortMediaList', () => {
            const sortBy = 'id';
            spyOn(mediaListService, 'sortMediaList');
            mediaListService.updateSortByProperty(sortBy);
            expect(mediaListService.sortMediaList).toHaveBeenCalled();
        });
    });

    describe('updateSortByDir', () => {
        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.updateSortByDir).toBeDefined();
        });

        it('should update sort dir property with the given value', () => {
            const sortDir = -1;
            expect(mediaListService.sortOptions.dir).not.toEqual(sortDir);
            mediaListService.updateSortByDir(sortDir);
            expect(mediaListService.sortOptions.dir).toEqual(sortDir);
        });

        it('should call sortMediaList', () => {
            const sortDir = -1;
            spyOn(mediaListService, 'sortMediaList');
            mediaListService.updateSortByDir(sortDir);
            expect(mediaListService.sortMediaList).toHaveBeenCalled();
        });
    });

    describe('updateFilterBy', () => {
        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.updateFilterBy).toBeDefined();
        });

        it('should update filter by property with the given value', () => {
            const filterBy = 'viewers';
            expect(mediaListService.filterBy).not.toEqual(filterBy);
            mediaListService.updateFilterBy(filterBy);
            expect(mediaListService.filterBy).toEqual(filterBy);
        });

        it('should call filterMediaList', () => {
            const filterBy = 'viewers';
            spyOn(mediaListService, 'filterMediaList');
            mediaListService.updateFilterBy(filterBy);
            expect(mediaListService.filterMediaList).toHaveBeenCalled();
        });
    });

    describe('sortMediaList', () => {
        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.sortMediaList).toBeDefined();
        });

        it('should call mediaList sort function', () => {
            spyOn(mediaListService.mediaList, 'sort');
            mediaListService.sortMediaList();
            expect(mediaListService.mediaList.sort).toHaveBeenCalled();
        });

        it('should sort given mediaList', () => {
            mediaListService.mediaList = [{ id: 0 }, { id: 2 }];
            mediaListService.sortOptions.by = 'id';
            mediaListService.sortMediaList();
            expect(mediaListService.mediaList).toEqual([{ id: 0 }, { id: 2 }]);

            mediaListService.sortOptions.dir = -1;
            mediaListService.sortMediaList();
            expect(mediaListService.mediaList).toEqual([{ id: 2 }, { id: 0 }]);
        });
    });

    describe('filterMediaList', () => {
        const dummyMediaList = [{
            id: 1,
            isLive: false,
            type: 'recorded'
        }, {
            id: 2,
            isLive: true,
            type: 'channel'
        }];

        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
            mediaListService.updateCache(dummyMediaList);
        });

        it('should exist', () => {
            expect(mediaListService.filterMediaList).toBeDefined();
        });

        it('should return all media when filterBy is *', () => {
            mediaListService.filterBy = '*';
            const filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).toEqual(dummyMediaList);
        });

        it('should return live items only when filterBy equals live', () => {
            mediaListService.filterBy = 'live';
            const filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).not.toEqual(dummyMediaList);
            expect(filteredItems.length).toEqual(1);
            expect(filteredItems[0]).toEqual(dummyMediaList[1]);
        });

        it('should return offline items only when filterBy equals offline', () => {
            mediaListService.filterBy = 'offline';
            const filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).not.toEqual(dummyMediaList);
            expect(filteredItems.length).toEqual(1);
            expect(filteredItems[0]).toEqual(dummyMediaList[0]);
        });

        it('should return video items only when filterBy equals video', () => {
            mediaListService.filterBy = 'video';
            const filteredItems = mediaListService.filterMediaList();
            expect(filteredItems).not.toEqual(dummyMediaList);
            expect(filteredItems.length).toEqual(1);
            expect(filteredItems[0]).toEqual(dummyMediaList[0]);
        });
    });

    describe('getMediaList', () => {
        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
        });

        it('should exist', () => {
            expect(mediaListService.getMediaList).toBeDefined();
        });

        it('should call sortMediaList', () => {
            spyOn(mediaListService, 'sortMediaList');
            mediaListService.getMediaList();
            expect(mediaListService.sortMediaList).toHaveBeenCalled();
        });

        it('should call filterMediaList', () => {
            spyOn(mediaListService, 'filterMediaList');
            mediaListService.getMediaList();
            expect(mediaListService.filterMediaList).toHaveBeenCalled();
        });

        it('should result filterMediaList result', () => {
            const dummyResult = 'dummy string';
            spyOn(mediaListService, 'filterMediaList').and.callFake(() => dummyResult);

            const getMediaListResult = mediaListService.getMediaList();
            expect(getMediaListResult).toEqual(dummyResult);
        });
    });

    describe('comparator', () => {
        beforeEach(() => {
            mediaListService = new MediaListService(eventEmitterSpy);
            mediaListService.sortOptions.by = 'id';
        });

        it('should return -1 when first item property less than second on default dir', () => {
            const firstItem = { id: 0 };
            const secondItem = { id: 2 };
            const comparisonResult = mediaListService.comparator(firstItem, secondItem);

            expect(comparisonResult).toEqual(-1);
        });

        it('should return 1 when first item property less than second on desc dir', () => {
            const firstItem = { id: 0 };
            const secondItem = { id: 2 };
            mediaListService.sortOptions.dir = -1;
            const comparisonResult = mediaListService.comparator(firstItem, secondItem);

            expect(comparisonResult).toEqual(1);
        });

        it('should return 1 when first item property bigger than second on default dir', () => {
            const firstItem = { id: 2 };
            const secondItem = { id: 0 };
            const comparisonResult = mediaListService.comparator(firstItem, secondItem);

            expect(comparisonResult).toEqual(1);
        });

        it('should return -1 when first item property bigger than second on desc dir', () => {
            const firstItem = { id: 2 };
            const secondItem = { id: 0 };
            mediaListService.sortOptions.dir = -1;
            const comparisonResult = mediaListService.comparator(firstItem, secondItem);

            expect(comparisonResult).toEqual(-1);
        });

        it('should return 0 when first and second item property are the same', () => {
            const firstItem = { id: 2 };
            const secondItem = { id: 2 };
            const comparisonResult = mediaListService.comparator(firstItem, secondItem);

            expect(comparisonResult).toEqual(0);
        });
    });
});
