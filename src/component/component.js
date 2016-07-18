export class Component {
    constructor(){
       this.element = jQuery('body');
    }

    activate() {
        this.view.buildView(this.element);
    }

    setElement(element){
        this.element = element;
    }
}