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

            $clickedItem.on('click', () => {
                if (functionInViewModel && typeof functionInViewModel === 'function') {
                    functionInViewModel.call(this.component, functionParameter);
                }
            });
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
            }
        });
    }
}
