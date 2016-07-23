import { list } from './view.helpers';

describe('list', () => {
    let templateFn;
    beforeEach(() => {
        templateFn = jasmine.createSpy('templateFn');
    });

    it('should call template function on every item', () => {
        const items = [1, 2, 3];
        list(items, templateFn);

        expect(templateFn).toHaveBeenCalledTimes(items.length);
    });

    it('should return empty string when empty items given', () => {
        const items = [];
        const listResult = list(items, templateFn);

        expect(listResult).toEqual('');
    });

    it('should return repeated template bound to given items', () => {
        const items = [1, 2, 3];
        const expectedResult = '123';
        const myTemplateFn = (item) => `${item}`;
        const templateResult = list(items, myTemplateFn);

        expect(templateResult).toEqual(expectedResult);
    });
});
