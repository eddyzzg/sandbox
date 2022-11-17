import playerHBS from '../../squad/player.hbs';
import BaseMatchElement from '../BaseMatchElement';
import PlayerDecisionEvent from '../PlayerDecisionEvent';
import PlayerDecisionWhereToMove from '../PlayerDecisionWhereToMove'
import GoalKeeperDecisionEvent from '../GoalKeeperDecisionEvent';
import GoalKeeperDecisionWhereToMove from '../GoalKeeperDecisionWhereToMove';

export default class Player extends BaseMatchElement {
    
    /**
     * @param {PlayerDef} playerDef
     * @param {Team} team
     */
    constructor(playerDef, team) {
        super();
        
        this.id = playerDef.id;
        this.position = playerDef.nominalPosition;
        this.isInAwayTeam = false;
        this.startPositionX = 0;
        this.startPositionY = 0;
        this.nominalPositionX = 1;
        this.nominalPositionY = 1;
        this.hasBall = false;
        this.definition = playerDef;
        this.ball = undefined;
        /** @type {Field} */
        this.field = undefined;
        this.team = team;
        this.decision = 'no decision';
        this.animationFile = 'left';
        this.isGK = this.position === 'GK';
    }
    
    /**
     * @param {Ball} ball
     */
    setBallInfo(ball) {
        this.ball = ball;
    }
    
    beforeMove() {
     //   let $element = this.getDOMSelector();
   //     $element.css('background-image', `url("../src/styles/img/${this.shirtColor}player${this.animationFile}.gif")`);
    }
    
    /**
     * @param {Field} field
     */
    setFieldInfo(field) {
        this.field = field;
    }
    
    /**
     * @param {String} color
     */
    setShitColor(color) {
        this.shirtColor = color;
    }
    
    /**
     * @param {Boolean} isAwayTeam
     */
    setIsInAwayTeam(isAwayTeam) {
        this.isInAwayTeam = isAwayTeam;
    }
    
    getAnimationTime() {
        //TODO: this.definition.speed * AVERAGE_ANIMATION_SPEED_RATIO
        return 400;
    }
    
    getDOMSelector() {
        return $(`#${this.id}.player`);
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
        if (this.isGK) {
            return new GoalKeeperDecisionEvent(this).run();
        }
        return new PlayerDecisionEvent(this).run();
    }
    
    decideWhereToMove() {
        if (this.isGK) {
            return new GoalKeeperDecisionWhereToMove(this).run();
        }
        return new PlayerDecisionWhereToMove(this).run();
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} [isInstantMove]
     * @returns {Promise<>}
     */
    move(positionX, positionY, isInstantMove = false) {
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} [isInstantMove]
     */
    moveToXY(positionX, positionY, isInstantMove = false) {
        this.positionX = positionX;
        this.positionY = positionY;
        
        // return this.executeMove(isInstantMove);
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     * @param {Boolean} [isInstantMove]
     */
    moveInDirectionOfXY(positionX, positionY, isInstantMove = false) {
        let speed = this.definition.speed;
        let {deltaX, deltaY} = this.getDeltas(positionX, positionY);
        
        let proportionX = deltaX / (Math.abs(deltaX) + Math.abs(deltaY));
        let proportionY = deltaY / (Math.abs(deltaX) + Math.abs(deltaY));
        let offsetX = proportionX * speed;
        let offsetY = proportionY * speed;
        
        deltaX = positionX - this.positionX;   //  powrót do precyzyjnych różnic celem wyeliminowania niepotrzebnych ruchów
        deltaY = positionY - this.positionY;
        
        if (Math.abs(deltaX) < speed) {      // jeżeli player jest blisko celu przesunie się tylko o ile trzeba
            offsetX = Math.floor(deltaX);
        }
        if (Math.abs(deltaY) < speed) {
            offsetY = Math.floor(deltaY);
        }
        this.setAnimationFile(offsetX, offsetY);
        
        this.positionX = this.positionX + offsetX;
        this.positionY = this.positionY + offsetY;
    }
    
    getDeltas(positionX, positionY) {
        let deltaX = Math.ceil(positionX) - Math.ceil(this.positionX);
        let deltaY = Math.ceil(positionY) - Math.ceil(this.positionY);
        return this.PreventDivideByZero(deltaX, deltaY);
    }
    
    PreventDivideByZero(deltaX, deltaY) {
        if (deltaX > -0.1 && deltaX <= 0) {
            deltaX = -0.1;
        } else if (deltaX > 0 && deltaX < 0.1) {
            deltaX = 0.1;
        }
        if (deltaY > -0.1 && deltaY <= 0) {
            deltaY = -0.1;
        } else if (deltaY > 0 && deltaY < 0.1) {
            deltaY = 0.1;
        }
        return {deltaX, deltaY};
    }
    
    setAnimationFile(offsetX, offsetY) {
        if (offsetX < 0) {
            this.animationFile = "left";
        }
        if (offsetX >= 0) {
            this.animationFile = "right";
        }
        if (Math.abs(offsetX) + Math.abs(offsetY) < 1) {
            this.animationFile = "rest";
        }
    }
    
    /**
     * @param {Player[]} players
     * @param {Ball} ball
     */
    passToClosestTeammate(players, ball) {
        let closestPlayer = players[0];
        let distance = 1400;
        closestPlayer = this.getClosestTeammate(players, distance, closestPlayer);
        this.setHasBall(false);
        closestPlayer.setHasBall(true);
        return ball.move(closestPlayer.positionX, closestPlayer.positionY);
    };
    
    /**
     *
     * @param {Boolean} boolean
     */
    setHasBall(boolean) {
        this.hasBall = boolean;
        this.team.hasBall = boolean;
    }
    
    /**
     * @param {Player[]} players
     * @param {Number} distance
     * @param {Player} closestPlayer
     * @returns {*}
     */
    getClosestTeammate(players, distance, closestPlayer) {
        players.forEach((player) => {
            if (this.getDistanceTo(player) < distance && this.id !== player.id) {
                closestPlayer = player;
                distance = this.getDistanceTo(player);
            }
        });
        return closestPlayer;
    }
    
    /**
     * @param {Player[]} opponentPlayers
     */
    getOpponentWithBallInRange(opponentPlayers) {
        if (this.team.hasBall) {
            return false;
        } else {
            let closestOpponentPlayerWithBall = opponentPlayers[0];
            opponentPlayers.forEach((opponentPlayer) => {
                if (opponentPlayer.hasBall) {
                    closestOpponentPlayerWithBall = opponentPlayer;
                }
            });
            
            if (this.getDistanceTo(closestOpponentPlayerWithBall) < 30) {
                return closestOpponentPlayerWithBall;
            } else {
                return false;
            }
        }
    }
    
    shoot() {
        if (this.isInAwayTeam) {
            this.ball.move(this.field.homeGoalX - this.field.goalWidth, this.field.homeGoalY + (this.field.goalHeight / 2));
        } else {
            this.ball.move(this.field.awayGoalX + this.field.goalWidth, this.field.awayGoalY + (this.field.goalHeight / 2));
        }
    }
    
    getDistanceTo(object) {
        let deltaX = this.positionX - object.positionX;
        let deltaY = this.positionY - object.positionY;
        return Math.ceil(Math.sqrt(deltaX * deltaX + deltaY * deltaY));
    }
    
    setNominalPosition(x, y) {
        this.nominalPositionX = x;
        this.nominalPositionY = y;
    }
    
    tryToWinTheBall(player, opponent) {
        if (Math.random() * (player.definition.technique + player.definition.dribble + player.definition.speed) > Math.random() * (opponent.definition.technique + opponent.definition.dribble + opponent.definition.speed)) {
            player.setHasBall(true);
            opponent.setHasBall(false);
            return this.ball.move(player.positionX, player.positionY);
        } else {
            return Promise.resolve(false);
        }
    }

    generateFace (){
    this.definition.face.generateFace();
    }
}
