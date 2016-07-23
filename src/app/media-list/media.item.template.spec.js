import { liveBadge, badge, location } from './media.item.template';

describe('mediaItemTemplate', () => {
    describe('liveBadge', () => {
        it('should return not empty template string when isLive is true', () => {
            const dummyMediaItem = { id: 1, isLive: true };
            const result = liveBadge(dummyMediaItem);

            expect(result).toBeDefined();
            expect(result).not.toEqual('');
        });

        it('should return empty template string when isLive is false', () => {
            const dummyMediaItem = { id: 1, isLive: false };
            const result = liveBadge(dummyMediaItem);

            expect(result).toBeDefined();
            expect(result).toEqual('');
        });
    });

    describe('badge', () => {
        it('should render item with given label', () => {
            const dummyLabel = 'dummy';
            const badgeResult = badge(dummyLabel);

            expect(badgeResult).toEqual('<span class="badge m-r-5">dummy</span>');
        });
    });

    describe('location', () => {
        it('should render location if it is defined', () => {
            const dummyLocation = {
                city: 'dummy city',
                country: 'dummy country'
            };
            const locationResult = location(dummyLocation);
            expect(locationResult).toEqual(
                '<span class="location">from dummy city, dummy country</span>');
        });
    });
});
