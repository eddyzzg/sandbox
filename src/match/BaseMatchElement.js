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
        if (this.animationFile === 'right') {
            $element.addClass('right-animation');
            $element.find('.faceContainer').css('animation', 'runRight 0.8s steps(8) infinite');
        }
        if (this.animationFile === 'left') {
            $element.addClass('left-animation');
            $element.find('.faceContainer').css('animation', 'runLeft 0.8s steps(8) infinite');
        }
        if (this.animationFile === 'rest') {
            $element.find('.faceContainer').css('animation', 'rest 0.8s steps(8) infinite');
        }
    }

    /**
     * @param {Boolean} log - should log to console
     * @returns {Promise<>}
     */
    executeMove(log = false) {
        const self = this;
        const $element = this.getJQuerySelector();
        const element = document.getElementById(this.getDOMSelector());
        this.beforeExecuteMove();

        this.setAnimation($element);

        return new Promise((resolve) => {
            element.addEventListener('transitionend', (event) => {
                onAnimationComplete(element, resolve, self)
            }, false);

            const animationDuration = this.getAnimationTime() / 1000;
            element.style.transitionDuration = `${animationDuration}s`;
    
            const posXString = `${this.positionX}px`
            const posYString = `${this.positionY}px`
            
            if (posXString !== element.style.left) {
                element.style.left = posXString;
            }
            if (posYString !== element.style.left) {
                element.style.top = posYString;
            }
    
            if (log) {
                if (self.isBall) {
                    console.log(`beforeAnimation ball`);
                } else {
                    console.log(`beforeAnimation ${self.id} posX: ${self.positionX} posY: ${self.positionY}`);
                }
            }
        });
    
        function onAnimationComplete(elem, resolve, self) {
            elem.removeEventListener('transitionend', onAnimationComplete);
            
            if (log) {
                if (self.isBall) {
                    console.log(`onComplete ball`);
                } else {
                    console.log(`onComplete ${self.id} posX: ${self.positionX} posY: ${self.positionY}`);
                }
            }
            resolve();
        }
    }

}
