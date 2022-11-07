export default class BaseMatchElement {
    constructor() {
    }
    
    /**
     * @returns {Number}
     */
    getAnimationTime() {
        return 400;
    }
    
    /**
     * @returns {jQuery}
     */
    getDOMSelector() {
    }
    
    /**
     * @returns {Function}
     */
    getTemplate() {
    }
    
    /**
     * @param {jQuery} $field
     */
    render($field) {
        const template = this.getTemplate();
        $field.append(template(this));
    }
    
    reRender() {
        const template = this.getTemplate();
        this.getDOMSelector().html(template(this));
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} isInstantMove
     * @returns {Promise<>}
     */
    move(positionX, positionY, isInstantMove) {
    }
}
