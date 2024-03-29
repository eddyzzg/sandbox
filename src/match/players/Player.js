import playerHBS from '../../squad/player.hbs';
import BaseMatchElement from '../BaseMatchElement';
import PlayerDecisionEvent from './PlayerDecisionEvent';
import PlayerDecisionWhereToMove from './PlayerDecisionWhereToMove'

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
        this.shirtColor = team.shirtColor;
        this.shortsColor = team.shortsColor;
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
        this.animationFile = 'Run';
        this.isGK = this.position === 'GK';
    }
    
    getLogName() {
        let teamName = this.team.isAwayTeam ? 'AWAYTEAM' : 'HOMETEAM';
        return `${this.id}_${this.definition.name}_${teamName}`;
    }
    
    /**
     * @param {Ball} ball
     */
    setBallInfo(ball) {
        this.ball = ball;
    }
    
    beforeExecuteMove() {
        // let $element = this.getJQuerySelector();
        // $element.css('background-image', `url('../src/styles/img/${this.shirtColor}player${this.animationFile}.gif')`);
    }
    
    /**
     * @param {Field} field
     */
    setFieldInfo(field) {
        this.field = field;
    }
    
    /** kolor z palety 30 kolorów
     * @param {integer} color1
     * @param {integer} color2
     */
    setShirtColor(color1, color2) {
        this.shirtColor = color1;
        this.shortsColor = color2;
    }
    
    /**
     * @param {Boolean} isAwayTeam
     */
    setIsInAwayTeam(isAwayTeam) {
        this.isInAwayTeam = isAwayTeam;
    }
    
    getAnimationTime() {
        //TODO: this.definition.speed * AVERAGE_ANIMATION_SPEED_RATIO
        return 600;
    }
    
    getJQuerySelector() {
        return $(`#${this.id}.player`);
    }
    
    getDOMSelector() {
        return `${this.id}`;
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
    
    decide(homeTeam, awayTeam) {
        // if (this.isGK) {
        //     return new GoalKeeperDecisionEvent(this).run();
        // }
        
        return new PlayerDecisionEvent(this, homeTeam, awayTeam).run();
    }
    
    decideWhereToMove() {
        // if (this.isGK) {
        //     return new GoalKeeperDecisionWhereToMove(this).run();
        // }
        return new PlayerDecisionWhereToMove(this).run();
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     */
    moveToXY(positionX, positionY) {
        this.positionX = positionX;
        this.positionY = positionY;
    }
    
    /**
     * @param {Number} positionX
     * @param {Number} positionY
     */
    moveInDirectionOfXY(positionX, positionY) {
        let speed = this.definition.speed;
        let {deltaX, deltaY} = this.getDeltas(positionX, positionY);
        
        let proportionX = deltaX / (Math.abs(deltaX) + Math.abs(deltaY));
        let proportionY = deltaY / (Math.abs(deltaX) + Math.abs(deltaY));
        let offsetX = proportionX * speed;
        let offsetY = proportionY * speed;
        
        //  powrót do precyzyjnych różnic celem wyeliminowania niepotrzebnych ruchów
        deltaX = positionX - this.positionX;
        deltaY = positionY - this.positionY;
        
        // jeżeli player jest blisko celu przesunie się tylko o ile trzeba
        if (Math.abs(deltaX) < speed) {
            offsetX = Math.floor(deltaX);
        }
        if (Math.abs(deltaY) < speed) {
            offsetY = Math.floor(deltaY);
        }
        
        this.setAnimationFile(offsetX, offsetY);
        this.positionX = this.positionX + offsetX;
        this.positionY = this.positionY + offsetY;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
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
            this.animationFile = 'left';
        }
        if (offsetX >= 0) {
            this.animationFile = 'right';
        }
        if (Math.abs(offsetX) + Math.abs(offsetY) < 1) {
            this.animationFile = 'rest';
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
    }
    
    pass(player, ball) {     // TODO  coś tu albo w wybieraniu celu podania sie pierdoli - czasem jest błąd przy podaniu, zazwyczaj do bocznego obroncy
        this.setHasBall(false);
        player.passTarget.setHasBall(true);
        return ball.move(player.passTarget.positionX, player.passTarget.positionY);
    }
    
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
            player.definition.speed = API.getGlobalParam('playerWithBall');   //diagnostics
            opponent.setHasBall(false);
            opponent.definition.speed = API.getGlobalParam('playerWithoutBall');   //diagnostics
            return this.ball.move(player.positionX, player.positionY);
        } else {
            return Promise.resolve(false);
        }
    }
    
    generatePlayerAvatarParameters() {
        this.definition.avatar.generatePlayerAvatarParameters();
    }
    
}
