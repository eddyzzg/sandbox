export default class BaseMatchElement {
    constructor() {
    }
    
    getAnimationTime() {
        return 400;
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
