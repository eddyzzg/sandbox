import elementWrapper from '../squad/element_wrapper.hbs';
import playerHBS from '../squad/player.hbs';
import BaseMarchElement from './BaseMarchElement';

export default class Player extends BaseMarchElement {
    
    constructor(id, name, position, team) {
        super();
        
        this.id = id;
        this.name = name;
        this.positionX = 1;
        this.positionY = 1;
        this.speed = Math.ceil(Math.random() * 100);
        this.power = Math.ceil(Math.random() * 100);
        this.passing = Math.ceil(Math.random() * 100);
        //  this.nominalPosition = nominalPosition;
        this.nominalPositionX = 1;
        this.nominalPositionY = 1;
        this.position = position;
        this.team = team;
        this.hasBall = false;
    }
    
    getPlayerDOMSelector() {
        return $(`#${this.id}`);
    }
    
    getTemplate() {
        return playerHBS;
    }
    
    decide() {
        let decisionArray = [];
        let index = 0;
        
        for (let i = 0; i < this.possibilityOfMove(); i++) {
            decisionArray[i + index] = "move";
        }
        index += this.possibilityOfMove();
        
        for (let i = 0; i < this.possibilityOfPass(); i++) {
            decisionArray[i + index] = "pass";
        }
        index += this.possibilityOfPass();
        
        for (let i = 0; i < this.possibilityOfShoot(); i++) {
            decisionArray[i + index] = "shoot";
        }
        index += this.possibilityOfShoot();
        
        let decision = decisionArray[Math.ceil(Math.random() * (index - 1))];
        return decision;
        
    }
    
    possibilityOfMove() {
        return 100;
    }
    
    possibilityOfPass() {
        if (this.hasBall === true) {
            return 100;
        } else {
            return 0;
        }
    }
    
    possibilityOfShoot() {
        if (this.hasBall === true) {
            
            return 10;
            
        } else {
            return 0;
        }
    }
    
    getRenderHTML() {
        return elementWrapper(this)
    }
    
    move(positionX, positionY, isInstantMove) {
        console.log('ruch');
        this.positionX = positionX + Math.ceil(Math.random() * 10) - 5;
        this.positionY = positionY + Math.ceil(Math.random() * 10) - 5;
        
        const $element = this.getPlayerDOMSelector().find('.player');
        if (isInstantMove) {
            $element.css('left', `${this.positionX}px`);
            $element.css('top', `${this.positionY}px`);
        } else {
            $element.animate({
                left: `${this.positionX}px`,
                top: `${this.positionY}px`,
            }, 600, () => {
                console.log('animation complete !');
            });
        }
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
