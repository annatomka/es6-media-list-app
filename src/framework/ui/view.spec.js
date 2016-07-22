import { View } from './view';
import { ERROR_UNDEFINED_TEMPLATE_RENDER, ERROR_CLICK_ON_UNDEFINED_FUNCTION, ERROR_CHANGE_ON_UNDEFINED_FUNCTION } from '../framework.constants';

describe('View', () => {
    describe('constructor', () => {
        it('should initialize $template to empty DOM element', () => {
            const view = new View();
            expect(view.$template).toEqual(jQuery('<div></div>'));
        });
    });

    describe('template', () => {
        it('should return empty string', () => {
            const view = new View();
            const templateResult = view.template();
            expect(templateResult).toEqual('');
        });
    });


    describe('render', () => {
        let view;

        beforeEach(() => {
            view = new View();
        });

        it('should replace $template html with template() result', () => {
            const dummyTemplateResult = 'dummy';
            spyOn(view, 'template').and.returnValue(dummyTemplateResult);
            view.render();
            expect(view.$template.html()).toEqual(dummyTemplateResult);
        });

        it('should register handlers', () => {
            spyOn(view, 'registerClickHandlers');
            spyOn(view, 'registerChangeHandlers');
            view.render();
            expect(view.registerClickHandlers).toHaveBeenCalled();
            expect(view.registerChangeHandlers).toHaveBeenCalled();
        });

        it('should throw error when $template not defined', () => {
            const dummyTemplateResult = 'dummy';
            view.$template = undefined;
            spyOn(view, 'template').and.returnValue(dummyTemplateResult);
            expect(() => {
                view.render();
            }).toThrow(new Error(ERROR_UNDEFINED_TEMPLATE_RENDER));
        });
    });

    describe('buildView', () => {
        let view;

        beforeEach(() => {
            view = new View();
        });

        it('should insert template in body when no DOM element is given', () => {
            const $body = jQuery('body');
            const $dummyElement = jQuery('<div id="dummyId"></div>');
            expect($body.find($dummyElement).length).toEqual(0);
            view.$template = $dummyElement;
            view.buildView();
            expect($body.find($dummyElement).length).toEqual(1);
        });

        it('should insert template into the given DOM element', () => {
            const $dummyParent = jQuery('<div id="dummyParentId"></div>');
            const $dummyElement = jQuery('<div id="dummyId"></div>');
            view.$template = $dummyElement;
            view.buildView($dummyParent);
            expect($dummyParent.find($dummyElement).length).toEqual(1);
        });

        it('should call render', () => {
            spyOn(view, 'render');
            view.buildView();
            expect(view.render).toHaveBeenCalled();
        });
    });

    describe('registerClickHandlers', () => {
        it('should call component function on click', () => {
            let view = new View();
            let dummyElement = '<button data-click="dummyClick"></button>';
            let $dummyElement = jQuery(dummyElement);

            spyOn(view, 'template').and.returnValue('<button data-click="dummyClick"></button>');
            view.component = jasmine.createSpyObj('view component', ['dummyClick']);
            view.$template = $dummyElement;

            view.render();

            view.$template.find('[data-click="dummyClick"]').trigger('click');
            expect(view.component.dummyClick).toHaveBeenCalled();
        });

        it('should throw error when function not exists', () => {
            let view = new View();
            let dummyElement = '<button data-click="badDummyClick"></button>';
            let $dummyElement = jQuery(dummyElement);

            spyOn(view, 'template').and.returnValue(dummyElement);
            view.component = jasmine.createSpyObj('view component', ['dummyClick']);
            view.$template = $dummyElement;



            expect(() => {
                view.render();
                //view.$template.find('[data-click="badDummyClick"]').trigger('click');
            }).toThrow(new Error(ERROR_CLICK_ON_UNDEFINED_FUNCTION));
        });
    });

    describe('registerChangeHandlers', () => {
        it('should call component function on change', () => {
            let view = new View();
            let dummyElement = '<input data-change="dummyChange"/>';
            let $dummyElement = jQuery(dummyElement);

            spyOn(view, 'template').and.returnValue(dummyElement);
            view.component = jasmine.createSpyObj('view component', ['dummyChange']);
            view.$template = $dummyElement;

            view.render();

            view.$template.find('[data-change="dummyChange"]').trigger('change');
            expect(view.component.dummyChange).toHaveBeenCalled();
        });

        it('should throw error when function not exists', () => {
            let view = new View();
            let dummyElement = '<input data-change="badDummyChange"/>';
            let $dummyElement = jQuery(dummyElement);

            spyOn(view, 'template').and.returnValue(dummyElement);
            view.component = jasmine.createSpyObj('view component', ['dummyChange']);
            view.$template = $dummyElement;

            expect(() => {
                view.render();
            }).toThrow(new Error(ERROR_CHANGE_ON_UNDEFINED_FUNCTION));
        });
    });
});