import elementWrapper from '../squad/element_wrapper.hbs';

export default class Player {

    constructor(id, name, nominalPosition, team) {
        this.id = id;
        this.name = name;
        this.positionX = 1;
        this.positionY = 1;
        this.speed = Math.ceil(Math.random() * 100);
        this.power = Math.ceil(Math.random() * 100);
        this.passing = Math.ceil(Math.random() * 100);
        this.nominalPosition = nominalPosition;
        this.nominalPositionX = 1;
        this.nominalPositionY = 1;
        this.position = "REZ";
        this.team = team;
    }

    makeMove() {

    }

    getRenderHTML() {
        return elementWrapper(this)
    }

    move(positionX, positionY) {
        this.positionX = positionX + 1;
        this.positionY = positionY + 1;
    }
}
