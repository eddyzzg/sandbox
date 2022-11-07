export default class BaseMarchElement {
    constructor() {
    }
    
    getPlayerDOMSelector() {
    }
    
    getTemplate() {
    }
    
    render($field) {
        const template = this.getTemplate();
        $field.append(template(this));
    }
    
    reRender() {
        const template = this.getTemplate();
        this.getPlayerDOMSelector().html(template(this));
    }
}
