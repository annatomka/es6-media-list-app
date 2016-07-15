import { ApiService } from './api.service';

describe('ApiService', () => {
    it('should add two numbers', () => {
        let jQuery = {
            getJSON: function () {
                "use strict";

            }
        };

        let mockItems = [{
            title: "my mock item"
        }];
        let apiService = new ApiService(jQuery);
        spyOn(jQuery, "getJSON").and.returnValue(mockItems);

        expect(jQuery.getJSON).toHaveBeenCalled();
    });
});
