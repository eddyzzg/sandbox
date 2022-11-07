import playerHBS from '../squad/player.hbs';
import BaseMatchElement from './BaseMatchElement';
import PlayerDecisionEvent from "./PlayerDecisionEvent";
import PlayerDecisionWhereToMove from "./PlayerDecisionWhereToMove"

export default class Player extends BaseMatchElement {

    /**
     * @param {PlayerDef} playerDef
     */
    constructor(playerDef) {
        super();

        this.id = playerDef.id;
        this.position = playerDef.nominalPosition;
        this.isInAwayTeam = false;

        this.nominalPositionX = 1;
        this.nominalPositionY = 1;

        this.hasBall = false;

        this.definition = playerDef;
    }

    setShitColor(color) {
        this.shirtColor = color;
    }

    setIsInAwayTeam(isAwayTeam) {
        this.isInAwayTeam = isAwayTeam;
    }

    getAnimationTime() {
        //TODO: this.definition.speed * AVERAGE_ANIMATION_SPEED_RATIO
        return 1000;
    }

    getDOMSelector() {
        return $(`#${this.id} .player`);
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

    decideWhereToMove() {
        return new PlayerDecisionWhereToMove(this).run();
    }

    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} [isInstantMove]
     * @returns {Promise<>}
     */
    move(positionX, positionY, isInstantMove = false) {

        this.positionX = positionX + Math.ceil(Math.random() * 10) - 5;
        this.positionY = positionY + Math.ceil(Math.random() * 10) - 5;
        return this.executeMove(isInstantMove);

        /*
        let deltaX = (targetX) - this.positionX;
        let deltaY = (targetY) - this.positionY;

        let proportionX = 1;
        let proportionY = 1;

        if (deltaX === 0) {
            proportionY = 1;
            proportionX = 0;
        } else {
            proportionX = ((deltaX / deltaY) / (deltaX + deltaY));
        }

        if (deltaY === 0) {
            proportionX = 1;
            proportionY = 0;
        } else {
            proportionY = ((deltaY / deltaX) / (deltaX + deltaY));
        }


        //      let proportion = proportionX + proportionY;


//        proportionX = (proportionX / proportion);
        //       proportionY = (proportionY / proportion);

        this.positionX = Math.ceil(this.positionX + (proportionX) * (this.speed / 10));
        this.positionY = Math.ceil(this.positionY + (proportionY) * (this.speed / 10));

*/

    }

    /**
     * @param {Player[]} players
     * @param {Ball} ball
     */
    pass(players, ball) {
        let closestPlayer = players[0];
        let distance = 1200;

        closestPlayer = this.getClosestTeammate(players, distance, closestPlayer);
        closestPlayer.hasBall = true;
        this.hasBall = false;

        return ball.move(closestPlayer.positionX, closestPlayer.positionY);
    };

    /**
     * @param {Player[]} players
     * @param {Number} distance
     * @param {Player} closestPlayer
     * @returns {*}
     */
    getClosestTeammate(players, distance, closestPlayer) {
        players.forEach((player) => {
            if (this.distance(player) < distance && this.id !== player.id) {
                closestPlayer = player;
                distance = this.distance(player);
            }
        });
        return closestPlayer;
    }

    shoot() {
        console.log('shot!');
    }

    distance(object) {
        let deltaX = this.positionX - object.positionX;
        let deltaY = this.positionY - object.positionY;
        return Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    }

    setNominalPosition(x, y) {
        this.nominalPositionX = x;
        this.nominalPositionY = y;
    }

}
