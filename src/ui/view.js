export class View {
    constructor(component) {
        this.component = component;
        this.$template = null;
        this.buildView();
    }

    buildView() {
        this.$template = jQuery(`<div></div>`);

        this.render();
        jQuery('body').append(this.$template);
    }

    template() {
        return '';
    }

    render() {
        this.$template.html(this.template());
        this.registerClickHandlers();
    }

    registerClickHandlers() {
        this.$template.find('[data-click]').each((index, clickedItem) => {
            jQuery(clickedItem).on('click', (event) => {
                console.log('item clicked');

                let $item = jQuery(clickedItem);
                let functionToCall = $item.data('click');
                let functionParameter = $item.data('clickParam');
                console.log("parameter: ", functionParameter);
                console.log("function to call: ", functionToCall);
                let functionInViewModel = this.component[functionToCall];

                if (functionInViewModel && typeof functionInViewModel === 'function') {
                    functionInViewModel.call(this.component, functionParameter);
                }
            });
        });
    }

    list(items, templateFn) {
        if (items && templateFn) {
            const result = items.map((item) => {
                return templateFn(item);
            });
            return result.join('');
        }
        return '';
    }
}
