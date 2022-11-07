import elementWrapper from '../squad/element_wrapper.hbs';
import playerHBS from '../squad/player.hbs';
import BaseMatchElement from './BaseMatchElement';

export default class Player extends BaseMatchElement {
    
    /**
     * @param {PlayerDef} playerDef
     */
    constructor(playerDef) {
        super();
        
        this.id = playerDef.id;
        this.position = playerDef.nominalPosition;
        
        this.positionX = 1;
        this.positionY = 1;
        
        this.nominalPositionX = 1;
        this.nominalPositionY = 1;
        
        this.hasBall = false;
        
        this.definition = playerDef;
    }
    
    setShitColor(color) {
        this.shirtColor = color;
    }
    
    getAnimationTime() {
        //TODO: this.definition.speed * AVERAGE_ANIMATION_SPEED_RATIO
        return 1000;
    }
    
    getDOMSelector() {
        return $(`#${this.id}`);
    }
    
    getTemplate() {
        return playerHBS;
    }
    
    decide() {
        let decisionArray = [];
        let index = 0;
        
        index = this.drawMove(decisionArray, index);
        index = this.drawPass(decisionArray, index);
        index = this.drawShoot(decisionArray, index);
        
        const randomIndex = Math.ceil(Math.random() * (index - 1));
        return decisionArray[randomIndex];
    }
    
    drawMove(decisionArray, index) {
        for (let i = 0; i < this.possibilityOfMove(); i++) {
            decisionArray[i + index] = "move";
        }
        index += this.possibilityOfMove();
        return index;
    }
    
    drawPass(decisionArray, index) {
        for (let i = 0; i < this.possibilityOfPass(); i++) {
            decisionArray[i + index] = "pass";
        }
        index += this.possibilityOfPass();
        return index;
    }
    
    drawShoot(decisionArray, index) {
        for (let i = 0; i < this.possibilityOfShoot(); i++) {
            decisionArray[i + index] = "shoot";
        }
        index += this.possibilityOfShoot();
        return index;
    }
    
    possibilityOfMove() {
        return 100;
    }
    
    possibilityOfPass() {
        if (this.hasBall) {
            return 100;
        } else {
            return 0;
        }
    }
    
    possibilityOfShoot() {
        if (this.hasBall) {
            return 10;
        } else {
            return 0;
        }
    }
    
    getRenderHTML() {
        return elementWrapper(this)
    }
    
    setRightStartTeam() {
        this.positionX = 1200;
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} isInstantMove
     * @returns {Promise<>}
     */
    move(positionX, positionY, isInstantMove) {
        return new Promise((resolve) => {
            this.positionX = positionX + Math.ceil(Math.random() * 10) - 5;
            this.positionY = positionY + Math.ceil(Math.random() * 10) - 5;
            
            const $element = this.getDOMSelector().find('.player');
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
    
    pass(team, ball) {
        let closestPlayer = team[0];
        let distance = 1200;
        
        team.forEach((player) => {
            if (this.distance(player) < distance && this.id !== player.id) {
                closestPlayer = player;
                distance = this.distance(player);
            }
        });
        
        closestPlayer.hasBall = true;
        this.hasBall = false;
        ball.move(closestPlayer.positionX, closestPlayer.positionY);
        // ball.reRender();
    };
    
    shoot() {
    }
    
    distance(object) {
        let deltaX = this.positionX - object.positionX;
        let deltaY = this.positionY - object.positionY;
        return Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    }
    
}
