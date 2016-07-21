import { mediaItemTemplate , liveBadge,badge} from './media.item.template';

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
       //TODO:
    });
});
