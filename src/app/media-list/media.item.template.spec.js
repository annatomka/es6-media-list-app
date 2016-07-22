import { mediaItemTemplate, liveBadge, badge, location } from './media.item.template';

describe('mediaItemTemplate', ()=> {
    "use strict";

    describe('liveBadge', ()=> {
        it('should return not empty template string when isLive is true', ()=> {
            var dummyMediaItem = {id: 1, isLive: true};

            var result = liveBadge(dummyMediaItem);

            expect(result).toBeDefined();
            expect(result).not.toEqual('');
        });

        it('should return empty template string when isLive is false', ()=> {
            var dummyMediaItem = {id: 1, isLive: false};

            var result = liveBadge(dummyMediaItem);

            expect(result).toBeDefined();
            expect(result).toEqual('');
        });
    });

    describe('badge', () => {
        it('should render item with given label', () => {
            let dummyLabel = "dummy";

            let badgeResult = badge(dummyLabel);

            expect(badgeResult).toEqual('<span class="badge m-r-5">dummy</span>');
        });
    });

    describe('location', () => {
        it('should render location if it is defined', () => {
            let dummyLocation = {
                city: 'dummy city',
                country: 'dummy country'
            };

            let locationResult = location(dummyLocation);
            expect(locationResult).toEqual('<span class="location">from dummy city, dummy country</span>');
        });
    });
});
