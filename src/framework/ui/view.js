import { ERROR_UNDEFINED_TEMPLATE_RENDER, ERROR_CLICK_ON_UNDEFINED_FUNCTION, ERROR_CHANGE_ON_UNDEFINED_FUNCTION } from '../framework.constants';

export class View {
    constructor(component) {
        this.component = component;
        this.$template = jQuery(`<div></div>`);
    }

    buildView(DOMElement) {
        const parentDOMElement = DOMElement || jQuery('body');
        parentDOMElement.append(this.$template);
        this.render();
    }

    template() {
        return '';
    }

    render() {
        if (this.$template) {
            this.$template.html(this.template());
            this.registerHandlers();
        } else {
            throw new Error(ERROR_UNDEFINED_TEMPLATE_RENDER);
        }
    }

    registerHandlers() {
        this.registerClickHandlers();
        this.registerChangeHandlers();
    }

    registerClickHandlers() {
        this.$template.find('[data-click]').each((index, clickedItem) => {
            const $clickedItem = jQuery(clickedItem);
            const functionToCall = $clickedItem.data('click');
            const functionParameter = $clickedItem.data('clickParam');
            const functionInViewModel = this.component[functionToCall];
            if (functionInViewModel && typeof functionInViewModel === 'function') {
                $clickedItem.on('click', () => {
                    functionInViewModel.call(this.component, functionParameter);
                });
            } else {
                throw new Error(ERROR_CLICK_ON_UNDEFINED_FUNCTION);
            }
        });
    }

    registerChangeHandlers() {
        this.$template.find('[data-change]').each((index, changedItem) => {
            const $changedItem = jQuery(changedItem);
            const functionToCallOnChange = $changedItem.data('change');
            const functionReference = this.component[functionToCallOnChange];

            if (functionReference && typeof functionReference === 'function') {
                $changedItem.change((event) => {
                    let val = jQuery(event.target).val();
                    functionReference.call(this.component, val);
                });
            } else {
                throw new Error(ERROR_CHANGE_ON_UNDEFINED_FUNCTION);
            }
        });
    }
}
