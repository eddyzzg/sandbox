export default class BaseMatchElement {
    constructor() {
        this.positionX = 0;
        this.positionY = 0;
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
     * @param {Boolean} [isInstantMove]
     * @returns {Promise<>}
     */


    //  move(positionX, positionY, isInstantMove = false) {
    //  }

    executeMove(isInstantMove, decision) {
        const $element = this.getDOMSelector()
        return new Promise((resolve) => {
            if (isInstantMove) {
                $element.css('left', `${this.positionX}px`);
                $element.css('top', `${this.positionY}px`);
                return resolve();
            }
            $element.animate({
                left: `${this.positionX}px`,
                top: `${this.positionY}px`,
            }, this.getAnimationTime(), () => {
                return resolve();
            });
        });
    }
}
