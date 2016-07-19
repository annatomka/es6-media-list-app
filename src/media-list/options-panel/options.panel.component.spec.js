import { OptionsComponent } from './options.panel.component';
import { EVENT_POLLING_INTERVAL_CHANGED } from '../../app.constants';

describe('OptionsComponent', ()=>{
    "use strict";
    let eventEmitterSpy, mediaListServiceSpy, mediaListComponentSpy;

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
        mediaListServiceSpy = jasmine.createSpyObj("MediaListService", ['updateCache', 'getMediaList','updateSortByProperty', 'updateSortByDir','updateFilterBy']);
        mediaListComponentSpy = jasmine.createSpyObj("MediaListComponent", ['updateMediaList']);
    });

    describe('onSortByPropertySelectionChanged', ()=>{
        let optionsComponent;

        beforeEach(()=>{
            optionsComponent = new OptionsComponent(mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy)
        });

        it('should update sort property with given parameter and update media list', ()=>{
            let dummySortProperty = "dummy";
            optionsComponent.onSortByPropertySelectionChanged(dummySortProperty);
            expect(mediaListServiceSpy.updateSortByProperty).toHaveBeenCalledWith(dummySortProperty);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalled();
        });

    });

    describe('onSortByPropertySelectionChanged', ()=>{
        it('should update sort property with given parameter and update media list', ()=>{
            let optionsComponent = new OptionsComponent(mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            let dummySortProperty = "dummy";
            optionsComponent.onSortByPropertySelectionChanged(dummySortProperty);
            expect(mediaListServiceSpy.updateSortByProperty).toHaveBeenCalledWith(dummySortProperty);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalled();
        });
    });

    describe('onSortByDirSelectionChanged', ()=>{
        it('should update sort by direction with given parameter and update media list', ()=>{
            let optionsComponent = new OptionsComponent(mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            let dummySortDir = -1;
            optionsComponent.onSortByDirSelectionChanged(dummySortDir);
            expect(mediaListServiceSpy.updateSortByDir).toHaveBeenCalledWith(dummySortDir);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalled();
        });
    });

    describe('onFilterSelectionChanged', ()=>{

        it('should update filter by', ()=>{
            let optionsComponent = new OptionsComponent(mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            let dummyFilter = "dummy";
            let dummyResult = ["dummy result"];
            mediaListServiceSpy.updateFilterBy.and.returnValue(dummyResult);
            optionsComponent.onFilterSelectionChanged(dummyFilter);
            expect(mediaListServiceSpy.updateFilterBy).toHaveBeenCalledWith(dummyFilter);
            expect(mediaListComponentSpy.updateMediaList).toHaveBeenCalledWith(dummyResult);
        });
    });

    describe('onPollingInputChanged', ()=> {
        it('should emit EVENT_POLLING_INTERVAL_CHANGED with given parameter', ()=>{
            let optionsComponent = new OptionsComponent(mediaListComponentSpy, eventEmitterSpy, mediaListServiceSpy);
            let dummyValue = "dummy";
            optionsComponent.onPollingInputChanged(dummyValue);
            expect(eventEmitterSpy.emit).toHaveBeenCalledWith(EVENT_POLLING_INTERVAL_CHANGED, dummyValue);
        });
    });
});