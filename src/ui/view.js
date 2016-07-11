export class View {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.$component = null;
        this.buildView();
    }

    buildView() {
        this.$component = jQuery(`<div></div>`);

        this.render();
        jQuery('body').append(this.$component);
    }

    template() {
        return '';
    }

    render() {
        this.$component.html(this.template());
        this.registerClickHandlers();
    }

    registerClickHandlers() {
        this.$component.find('[data-click]').each((index, item) => {
           jQuery(item).on('click', () => {
              console.log('item clicked');
               let $item = jQuery(item);
               let dataClickValue = $item.data('click');
               let viewModelValue = this.viewModel[dataClickValue];

               if(viewModelValue && typeof viewModelValue === 'function'){
                   viewModelValue();
               }
           });
        });
    }
}
