import { Component } from './component';

describe('Component', ()=>{
    "use strict";

    describe('constructor', ()=>{
        it('should initialize element to body', ()=>{
            let component = new Component();
            expect(component.element).toEqual(jQuery('body'));
        });
    });

    describe('activate', ()=>{
        it('should call view buildView with component element when it has view', ()=>{
            let component = new Component();
            component.view = jasmine.createSpyObj('view',['buildView']);
            component.activate();
            expect(component.view.buildView).toHaveBeenCalledWith(component.element);
        });
    });

    describe('setElement', ()=>{
        it('should set given element', ()=>{
            let component = new Component();
            var dummyElement = jQuery('');

            expect(component.element).not.toEqual(dummyElement);
            component.setElement(dummyElement);
            expect(component.element).toEqual(dummyElement);
        })
    });
});