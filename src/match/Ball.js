import ballTemplate from './ball.hbs'
import BaseMatchElement from "./BaseMatchElement";

export default class Ball extends BaseMatchElement {
    
    constructor() {
        super();
        
        this.positionX = 550;
        this.positionY = 355;
    }
    
    getPlayerDOMSelector() {
        return $('#ball .ball');
    }
    
    getTemplate() {
        return ballTemplate;
    }
    
    move(x, y, isInstantMove) {
        this.positionX = x;
        this.positionY = y;
        
        const $element = this.getPlayerDOMSelector();
        if (isInstantMove) {
            $element.css('left', `${this.positionX}px`);
            $element.css('top', `${this.positionY}px`);
        } else {
            $element.animate({
                left: `${this.positionX}px`,
                top: `${this.positionY}px`,
            }, 400, () => {
                console.log('animation complete !');
            });
        }
    }
}
