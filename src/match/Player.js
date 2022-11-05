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

    makeMove() {

    }

    getRenderHTML() {
        return elementWrapper(this)
    }

    move(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
    
    render($field){
    
        $field.append(playerHBS({
            id: this.id,
            name: this.name,
            position: this.position,
            positionX: this.positionX - 25,
            positionY: this.positionY,
            team: this.team,
        }));
    }
}
