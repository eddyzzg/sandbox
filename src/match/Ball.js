import ballTemplate from './ball.hbs'
import BaseMatchElement from "./BaseMatchElement";

export default class Ball extends BaseMatchElement {

    constructor() {
        super();
        this.startPositionX = 0;
        this.startPositionY = 0;
        this.positionX = 550;
        this.positionY = 355;
        this.width = 15;
        this.height = 15;
        this.playerID = "";
    }

    /**
     * @returns {jQuery}
     */
    getDOMSelector() {
        return $('#ball.ball');
    }

    /**
     * @returns {Function}
     */
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
        // return this.executeMove(isInstantMove);

    }

 
}
