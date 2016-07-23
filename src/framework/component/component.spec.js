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

        it('should call view buildView with component element when it has view', () => {
            const component = new Component();
            component.view = jasmine.createSpyObj('view', ['buildView']);
            component.activate();
            expect(component.view.buildView).toHaveBeenCalledWith(component.element);
        });

        it('should not call buildView when view is not defined', () => {
            const component = new Component();
            component.activate();
            expect(component.view).not.toBeDefined();
        });
    });

    describe('setElement', () => {
        it('should exist', () => {
            const component = new Component();
            expect(component.setElement).toBeDefined();
        });

        it('should set given element', () => {
            const component = new Component();
            const dummyElement = jQuery('');

            expect(component.element).not.toEqual(dummyElement);
            component.setElement(dummyElement);
            expect(component.element).toEqual(dummyElement);
        });
    });
});
