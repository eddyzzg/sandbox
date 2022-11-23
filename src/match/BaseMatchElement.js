export default class BaseMatchElement {
    constructor() {
        /** @type {Number} */
        this.positionX = 0;
        /** @type {Number} */
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
    getJQuerySelector() {
    }
    
    /**
     * @returns {String}
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
        this.getJQuerySelector().html(template(this));
    }
    
    beforeExecuteMove() {
    }
    
    afterExecuteMove() {
    }


    setAnimation($element) {
        if (this.animationFile==="right") {
            $element.find(".shirt").css("background-position-y", "45px");
            $element.find(".shorts").css("background-position-y", "45px");
            $element.find(".boots").css("background-position-y", "45px");
            $element.find(".body").css("background-position-y", "45px");
            $element.find(".shirt").css("transform", "scale(1,1)");
            $element.find(".shorts").css("transform", "scale(1,1)");
            $element.find(".boots").css("transform", "scale(1,1)");
            $element.find(".body").css("transform", "scale(1,1)");

            $element.find(".faceContainer").css("animation", " runRight 0.8s steps(8) infinite");

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

            $element.find(".faceContainer").css("animation", " runLeft 0.8s steps(8) infinite");
        }
        if (this.animationFile==="rest") {
            $element.find(".shirt").css("background-position-y", "0px");
            $element.find(".shorts").css("background-position-y", "0px");
            $element.find(".boots").css("background-position-y", "0px");
            $element.find(".body").css("background-position-y", "0px");
            $element.find(".faceContainer").css("animation", " rest 0.8s steps(8) infinite");
        }
    }
    
    /**
     * @returns {Promise<>}
     */
    executeMoveOnTransitions() {
        const element = document.getElementById(this.getDOMSelector());
        this.beforeExecuteMove();
        
        this.setAnimation($element);


        return new Promise((resolve) => {
            element.addEventListener('transitionend', () => {
                this.afterExecuteMove();
                return resolve();
            });
            
            element.style.left = `${this.positionX}px`;
            element.style.top = `${this.positionY}px`;
            
            const animationDuration = this.getAnimationTime() / 1000;
            element.style.transitionDuration = `${animationDuration}s`;
        });
    }
    
    /**
     * @returns {Promise<>}
     */
    executeMove() {
        const $element = this.getJQuerySelector();
        this.beforeExecuteMove();
        return new Promise((resolve) => {
            $element.animate({
                left: `${this.positionX}px`,
                top: `${this.positionY}px`,
                
            }, this.getAnimationTime(), () => {
                this.afterExecuteMove();
                return resolve();
            });
        });
    }
    
}
