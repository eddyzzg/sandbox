import elementWrapper from '../squad/element_wrapper.hbs';
import playerHBS from "../squad/player.hbs";

export default class Player {
    
    constructor(id, name, position, team) {
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
    
    makeMove() {
    }
    
    getRenderHTML() {
        return elementWrapper(this)
    }
    
    move(positionX, positionY) {
        this.positionX = positionX + Math.ceil(Math.random() * 10) - 5;
        this.positionY = positionY + Math.ceil(Math.random() * 10) - 5;
    }
    
    render($field) {
        $field.append(playerHBS({
            id: this.id,
            name: this.name,
            position: this.position,
            positionX: this.positionX,
            positionY: this.positionY,
            team: this.team,
        }));
    }
    
    reRender(id, x, y) {
        this.getPlayerDOMSelector().html(playerHBS({
            id: this.id,
            name: this.name,
            position: this.position,
            positionX: x,
            positionY: y,
            team: this.team,
        }));
    }
}
