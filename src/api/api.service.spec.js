import { ApiService } from './api.service';

describe('ApiService', () => {
    let mockMediaItems = [{
        title: "mock media item"
    }];

    let jQuery = {
        getJSON: () => {}
    };

    let apiService = new ApiService(jQuery);

    describe('getAllMediaItems', ()=> {
        let requestedMediaItems = [];

        beforeEach(()=> {
            spyOn(jQuery, 'getJSON').and.returnValue(mockMediaItems);
            requestedMediaItems = apiService.getAllMediaItems();
        });


        it('should call getJSON', () => {
            expect(jQuery.getJSON).toHaveBeenCalled();
        });

        it('should return the requested value', () => {
            expect(requestedMediaItems).toEqual(mockMediaItems);
        });

    })
});
