import { list } from './view.helpers';

describe('list', ()=> {
    "use strict";
    let templateFn;
    beforeEach(()=>{
         templateFn = jasmine.createSpy('templateFn');
    });

    it('should call template function on every item', ()=> {
        let items = [1, 2, 3];

        list(items, templateFn);

        expect(templateFn).toHaveBeenCalledTimes(items.length);
    });

    it('should return empty string when empty items given', ()=>{
        let items = [];

        let listResult = list(items, templateFn);
        expect(listResult).toEqual('');
    });

    it('should return repeated template bound to given items', () => {
       let items = [1,2,3];
       let expectedResult = "123";

       let myTemplateFn = (item)=>{
           return `${item}`;
       };

       let templateResult = list(items, myTemplateFn);
       expect(templateResult).toEqual(expectedResult);
    });
});