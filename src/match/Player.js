export default class Player {

    constructor(id, name, surname, positionX, positionY, nominalPosition) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.positionX = positionX;
        this.positionY = positionY;
        this.speed = Math.ceil(Math.random()*100);
        this.power = Math.ceil(Math.random()*100);
        this.nominalPosition = nominalPosition;



    }

    move(positionX,positionY) {
        positionX = positionX + 1;
        positionY = positionY + 1;
    }
}
