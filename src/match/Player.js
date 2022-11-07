import playerHBS from '../squad/player.hbs';
import BaseMatchElement from './BaseMatchElement';
import PlayerDecisionEvent from "./PlayerDecisionEvent";

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
    
    /**
     * @returns {Function}
     */
    getTemplate() {
        return playerHBS;
    }
    
    setRightStartTeam() {
        this.positionX = 1200;
    }
    
    decide() {
        return new PlayerDecisionEvent(this).run();
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
    };
    
    shoot() {
    }
    
    distance(object) {
        let deltaX = this.positionX - object.positionX;
        let deltaY = this.positionY - object.positionY;
        return Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    }
    
}
