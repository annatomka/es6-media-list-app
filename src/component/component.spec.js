import { Component } from './component';

describe('Component', () => {
    describe('constructor', () => {
        it('should initialize element to body', () => {
            const component = new Component();
            expect(component.element).toEqual(jQuery('body'));
        });
    });

    describe('activate', () => {
        it('should exist', () => {
            const component = new Component();
            expect(component.activate).toBeDefined();
        });

        it('should call view buildView with component element when it has view', ()=> {
            let component = new Component();
            component.view = jasmine.createSpyObj('view', ['buildView']);
            component.activate();
            expect(component.view.buildView).toHaveBeenCalledWith(component.element);
        });
    });

    describe('setElement', () => {
        it('should exist', ()=>{
            let component = new Component();
            expect(component.setElement).toBeDefined();
        });

        it('should set given element', () => {
            let component = new Component();
            var dummyElement = jQuery('');

            expect(component.element).not.toEqual(dummyElement);
            component.setElement(dummyElement);
            expect(component.element).toEqual(dummyElement);
        });
    });
});