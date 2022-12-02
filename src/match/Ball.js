import ballTemplate from './ball.hbs'
import BaseMatchElement from "./BaseMatchElement";

export default class Ball extends BaseMatchElement {
    
    constructor() {
        super();
        this.startPositionX = 0;
        this.startPositionY = 0;
        this.positionX = 550;
        this.positionY = 355;
        this.width = 10;
        this.height = 10;
        this.playerID = "";
        this.isBall = true;
    }
    
    getJQuerySelector() {
        return $('#ball.ball');
    }
    
    getDOMSelector() {
        return `ball`;
    }
    
    getTemplate() {
        return ballTemplate;
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} [isInstantMove]
     */
    move(positionX, positionY, isInstantMove = false) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
    
    
}
