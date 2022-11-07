import ballTemplate from './ball.hbs'
import BaseMatchElement from "./BaseMatchElement";

export default class Ball extends BaseMatchElement {
    
    constructor() {
        super();
        
        this.positionX = 550;
        this.positionY = 355;
    }
    
    /**
     * @returns {jQuery}
     */
    getDOMSelector() {
        return $('#ball .ball');
    }
    
    /**
     * @returns {HandlebarsTemplates}
     */
    getTemplate() {
        return ballTemplate;
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} isInstantMove
     * @returns {Promise<>}
     */
    move(positionX, positionY, isInstantMove) {
        return new Promise((resolve) => {
            this.positionX = positionX;
            this.positionY = positionY;
            
            const $element = this.getDOMSelector();
            if (isInstantMove) {
                $element.css('left', `${this.positionX}px`);
                $element.css('top', `${this.positionY}px`);
            } else {
                $element.animate({
                    left: `${this.positionX}px`,
                    top: `${this.positionY}px`,
                }, this.getAnimationTime(), () => {
                    return resolve();
                });
            }
        });
    }
}
