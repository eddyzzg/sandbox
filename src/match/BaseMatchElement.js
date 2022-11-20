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
    
    beforeMove() {
    }
    
    /**
     * @param {Boolean} [isInstantMove]
     * @returns {Promise<>}
     */
    executeMove(isInstantMove) {
        const $element = this.getDOMSelector();
        this.beforeMove();

        if (this.animationFile==="right") {
            $element.find(".shirt").css("background-position-y", "45px");
            $element.find(".shorts").css("background-position-y", "45px");
            $element.find(".boots").css("background-position-y", "45px");
            $element.find(".body").css("background-position-y", "45px");
            $element.find(".shirt").css("transform", "scale(1,1)");
            $element.find(".shorts").css("transform", "scale(1,1)");
            $element.find(".boots").css("transform", "scale(1,1)");
            $element.find(".body").css("transform", "scale(1,1)");

        }
        if (this.animationFile==="left") {
            $element.find(".shirt").css("background-position-y", "45px");
            $element.find(".shorts").css("background-position-y", "45px");
            $element.find(".boots").css("background-position-y", "45px");
            $element.find(".body").css("background-position-y", "45px");
            $element.find(".shirt").css("transform", "scale(-1,1)");
            $element.find(".shorts").css("transform", "scale(-1,1)");
            $element.find(".boots").css("transform", "scale(-1,1)");
            $element.find(".body").css("transform", "scale(-1,1)");
        }
        if (this.animationFile==="rest") {
            $element.find(".shirt").css("background-position-y", "0px");
            $element.find(".shorts").css("background-position-y", "0px");
            $element.find(".boots").css("background-position-y", "0px");
            $element.find(".body").css("background-position-y", "0px");
        }


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
