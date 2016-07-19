export class Component {
    constructor() {
        this.element = jQuery('body');
    }

    activate() {
        if (this.view) {
            this.view.buildView(this.element);
        }
    }

    setElement(element) {
        this.element = element;
    }
}