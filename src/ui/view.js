export class View {
    constructor(viewModel) {
        this.viewModel = viewModel;
        this.$component = null;
        this.buildView();
    }

    buildView() {
        this.$component = jQuery(`<div></div>`);

        this.$component.html(this.template());
        jQuery('body').append(this.$component);
    }

    template() {
        return '';
    }

    render() {
        this.$component.html(this.template());
    }
}
