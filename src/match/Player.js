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
        return new PlayerDecisionWhereToMove(this, ball).run();
    }

    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} [isInstantMove]
     * @returns {Promise<>}
     */
    move(positionX, positionY, isInstantMove = false) {
    }

    moveToXY(positionX, positionY, isInstantMove = false) {

        this.positionX = positionX;
        this.positionY = positionY;


        return this.executeMove(isInstantMove);
    }

    moveInDirectionOfXY(positionX, positionY, isInstantMove = false) {


        let speed = this.definition.speed / 2;   // ustalenie przesuwanie się w turze przez playera max o przedział od 0 do 50

        let deltaX = Math.ceil(positionX) - Math.ceil(this.positionX);   //usuwanie prawdpodobienstwa dzielenia przez zero usuwając je z danych wejsciowych
        let deltaY = Math.ceil(positionY) - Math.ceil(this.positionY);

        if (deltaX > -1 && deltaX <= 0) {
            deltaX = -1;
        } else if (deltaX > 0 && deltaX < 1) {
            deltaX = 1;
        }

        if (deltaY > -1 && deltaY <= 0) {
            deltaY = -1;
        } else if (deltaY > 0 && deltaY < 1) {
            deltaY = 1;
        }                                                       // koniec usuwania prawdopodobienstwa dzielenia przez zero

        let proportionY = deltaY / (Math.abs(deltaX) + Math.abs(deltaY));
        let proportionX = deltaX / (Math.abs(deltaX) + Math.abs(deltaY));
        let offsetX = proportionX * speed;
        let offsetY = proportionY * speed;

        if (Math.abs(deltaX) < speed) {      // jeżeli player jest blisko celu przesunie się tylko o ile trzeba
            offsetX = deltaX;
        } else if (Math.abs(deltaY) < speed) {
            offsetY = deltaY;
        }

        this.positionX = this.positionX + offsetX;
        this.positionY = this.positionY + offsetY;
        return this.executeMove(isInstantMove);


    }

    /**
     * @param {Player[]} players
     * @param {Ball} ball
     */
    pass(players, ball) {
        let closestPlayer = players[0];
        let distance = 1400;

        closestPlayer = this.getClosestTeammate(players, distance, closestPlayer);
        console.log(closestPlayer);
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
