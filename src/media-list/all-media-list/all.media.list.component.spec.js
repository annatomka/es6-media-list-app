import { AllMediaListComponent } from './all.media.list.compontent';

describe('AllMediaListComponent', ()=>{
    "use strict";
    let eventEmitterSpy, mediaListService;

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
        mediaListService = jasmine.createSpyObj("MediaListService", ['updateCache', 'getMediaList']);
    });
});