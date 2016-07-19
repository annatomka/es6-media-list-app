import { View } from './view';

describe('View', ()=> {
    "use strict";

    describe('buildView', ()=> {

    });

    describe('template', ()=> {
        it('should return empty string', ()=> {
            let view = new View();
            let templateResult = view.template();
            expect(templateResult).toEqual('');
        });
    });

    describe('render', ()=> {

    });

    describe('registerClickHandlers', ()=> {

    });

    describe('registerChangeHandlers', ()=> {

    });

    describe('registerBindOptionHandlers', ()=> {

    });
});