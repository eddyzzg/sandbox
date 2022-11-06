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

    move(positionX, positionY) {
        this.positionX = positionX + Math.ceil(Math.random() * 10) - 5;
        this.positionY = positionY + Math.ceil(Math.random() * 10) - 5;

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
        ball.reRender();


    };


    shoot() {

    }

    distance(object) {
        let deltaX = this.positionX - object.positionX;
        let deltaY = this.positionY - object.positionY;
        let distance = Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
        return distance;
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

    reRender(id, x, y, $playerDiv) {
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
