import { OptionsComponent } from './options.panel.component';
import { EVENT_POLLING_INTERVAL_CHANGED } from '../../app.constants';

describe('OptionsComponent', () => {
    let eventEmitterSpy;
    let mediaListServiceSpy;
    let mediaListComponentSpy;

    beforeEach(() => {
        eventEmitterSpy = jasmine.createSpyObj('EventEmitter', ['on', 'emit']);
        mediaListServiceSpy = jasmine.createSpyObj('MediaListService', ['updateCache',
            'updateSortByProperty', 'getMediaList', 'updateSortByDir', 'updateFilterBy']);
        mediaListComponentSpy = jasmine.createSpyObj('MediaListComponent', ['updateMediaList']);
    });

    describe('onSortByPropertySelectionChanged', () => {
        let optionsComponent;

        beforeEach(() => {
            optionsComponent = new OptionsComponent(mediaListComponentSpy,
                eventEmitterSpy, mediaListServiceSpy);
        });

        it('should exist', () => {
            expect(optionsComponent.onSortByPropertySelectionChanged).toBeDefined();
        });

        it('should update sort property with given parameter and update media list', () => {
            const dummySortProperty = 'dummy';
            optionsComponent.onSortByPropertySelectionChanged(dummySortProperty);
            expect(mediaListServiceSpy.updateSortByProperty)
                .toHaveBeenCalledWith(dummySortProperty);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalled();
        });
    });

    describe('onSortByPropertySelectionChanged', () => {
        it('should exist', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            expect(optionsComponent.onSortByPropertySelectionChanged).toBeDefined();
        });

        it('should update sort property with given parameter and update media list', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            const dummySortProperty = 'dummy';
            optionsComponent.onSortByPropertySelectionChanged(dummySortProperty);
            expect(mediaListServiceSpy.updateSortByProperty)
                .toHaveBeenCalledWith(dummySortProperty);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalled();
        });
    });

    describe('onSortByDirSelectionChanged', () => {
        it('should exist', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            expect(optionsComponent.onSortByDirSelectionChanged).toBeDefined();
        });

        it('should update sort by direction with given parameter and update media list', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            const dummySortDir = -1;
            optionsComponent.onSortByDirSelectionChanged(dummySortDir);
            expect(mediaListServiceSpy.updateSortByDir).toHaveBeenCalledWith(dummySortDir);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalled();
        });
    });

    describe('onFilterSelectionChanged', () => {
        it('should exist', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            expect(optionsComponent.onFilterSelectionChanged).toBeDefined();
        });

        it('should update filter by', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            const dummyFilter = 'dummy';
            const dummyResult = ['dummy result'];
            mediaListServiceSpy.updateFilterBy.and.returnValue(dummyResult);
            optionsComponent.onFilterSelectionChanged(dummyFilter);
            expect(mediaListServiceSpy.updateFilterBy).toHaveBeenCalledWith(dummyFilter);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalledWith(dummyResult);
        });
    });

    describe('onPollingInputChanged', () => {
        it('should exist', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            expect(optionsComponent.onPollingInputChanged).toBeDefined();
        });

        it('should emit EVENT_POLLING_INTERVAL_CHANGED with given parameter', () => {
            const optionsComponent = new OptionsComponent(
                mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            const dummyValue = 'dummy';
            optionsComponent.onPollingInputChanged(dummyValue);
            expect(eventEmitterSpy.emit)
                .toHaveBeenCalledWith(EVENT_POLLING_INTERVAL_CHANGED, dummyValue);
        });
    });
});
