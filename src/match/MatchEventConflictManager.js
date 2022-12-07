const playerHeight = 15;
const playerWidth = 15;


export default class MatchEventConflictManager {
    constructor(allPlayers, ball, field, match) {
        this.players = allPlayers;
        this.ball = ball;
        this.field = field;
        this.match = match;
    }
    
    validateMove() {
        this.players.forEach((player) => {
            const positionConflict = this.checkMyPositionWithRest(player);
            
            if (!positionConflict.success) {
                //TODO: do statystyk wygrana/przegrana batalia o miejsce
                if (!this.players.conflictWin) {
                    positionConflict.executePositionBattle();
                }
            }
        });
    }
    
    checkGoal() {
        const conflictReport = new MatchSpecialEventReport(this.match);
        const areaOccupiedByBallX = {leftEdge: this.ball.positionX, rightEdge: this.ball.positionX + this.ball.width};
        const areaOccupiedByBallY = {topEdge: this.ball.positionY, bottomEdge: this.ball.positionY + this.ball.width};
        
        const areaOccupiedByHomeGoalX = {
            leftEdge: this.field.homeGoalX - this.field.goalWidth,
            rightEdge: this.field.homeGoalX
        };
        const areaOccupiedByHomeGoalY = {
            topEdge: this.field.homeGoalY,
            bottomEdge: this.field.homeGoalY + this.field.goalHeight
        };
        
        const areaOccupiedByAwayGoalX = {
            leftEdge: this.field.awayGoalX,
            rightEdge: this.field.awayGoalX + this.field.goalWidth
        };
        const areaOccupiedByAwayGoalY = {
            topEdge: this.field.awayGoalY,
            bottomEdge: this.field.awayGoalY + this.field.goalHeight
        };
        
        if (areaOccupiedByBallX.rightEdge < areaOccupiedByHomeGoalX.rightEdge) {
            if (areaOccupiedByBallY.bottomEdge < areaOccupiedByHomeGoalY.bottomEdge && areaOccupiedByBallY.topEdge > areaOccupiedByHomeGoalY.topEdge) {
                conflictReport.scoreAwayGoal();
                // this.match.goalEvent();
            }
        }
        if (areaOccupiedByBallX.leftEdge > areaOccupiedByAwayGoalX.leftEdge) {
            if (areaOccupiedByBallY.bottomEdge < areaOccupiedByAwayGoalY.bottomEdge && areaOccupiedByBallY.topEdge > areaOccupiedByAwayGoalY.topEdge) {
                conflictReport.scoreHomeGoal();
                // this.match.goalEvent();
            }
        }
        return conflictReport;
    }
    
    /**
     * @param {Player} inPlayer
     * @returns {PositionXConflictReport}
     */
    checkMyPositionWithRest(inPlayer) {
        const inPosX = inPlayer.positionX;
        const inPosY = inPlayer.positionY;
        const areaOccupiedByInPlayerX = {from: inPlayer.positionX, to: inPlayer.positionX + playerWidth};
        const areaOccupiedByInPlayerY = {from: inPlayer.positionY, to: inPlayer.positionY + playerHeight};



        const conflictReport = new PositionXConflictReport(inPlayer);
        this.players.forEach((player) => {
            if (player.id !== inPlayer.id) {
                const areaOccupiedByPlayerX = {from: player.positionX, to: player.positionX + playerWidth};
                const areaOccupiedByPlayerY = {from: player.positionY, to: player.positionY + playerHeight};
                
                if (inPosX >= areaOccupiedByPlayerX.from && inPosX <= areaOccupiedByPlayerX.to) {
                    if (inPosY >= areaOccupiedByPlayerY.from && inPosY <= areaOccupiedByPlayerY.to) {

                       // let delta = getConflictedDeltaXY(areaOccupiedByPlayerX,areaOccupiedByPlayerY,areaOccupiedByInPlayerX,areaOccupiedByInPlayerY);
                        conflictReport.addConflict(player);
                    }
                }
            }
        });
        return conflictReport;
    }

    getConflictedDeltaXY(areaOccupiedByPlayerX,areaOccupiedByPlayerY,areaOccupiedByInPlayerX,areaOccupiedByInPlayerY) {
        // TODO wyliczyć o ile na siebie nachodzo
    }
}




class MatchSpecialEventReport {
    constructor(match) {
        this.match = match;
        this.result = '';
    }
    
    scoreAwayGoal() {
        API.eventBus.send(API.events.MATCH_EVENTS.GOAL_SCORED, 'AWAY');
        this.result = API.events.MATCH_EVENTS.AWAY_GOAL;
    }
    
    scoreHomeGoal() {
        API.eventBus.send(API.events.MATCH_EVENTS.GOAL_SCORED, 'HOME');
        this.result = API.events.MATCH_EVENTS.HOME_GOAL;
    }
}

class PositionXConflictReport {
    constructor(player) {
        this.player = player;
        this.conflictedPlayers = [];
        
        this.success = true;
    }
    
    addConflict(player) {
        this.conflictedPlayers.push(player);
        this.success = false;
    }
    
    executePositionBattle() {
        const strength = this.player.definition.strength;
        let success = true;
        
        this.conflictedPlayers.every((conflictedPlayer) => {
            if (this.player.id !== conflictedPlayer.id) {
                if (strength > conflictedPlayer.definition.strength) {
                    return true;
                } else {
                    success = false;

                    let battleLostOffsetX=this.player.offsetX;
                    let battleLostOffsetY=this.player.offsetY;
                    if (this.player.offsetX>15) {
                        battleLostOffsetX=15;
                    }
                    if (this.player.offsetX<-15) {
                        battleLostOffsetX=-15;
                    }
                    if (this.player.offsetY>15) {
                        battleLostOffsetY=15;
                    }
                    if (this.player.offsetY<-15) {
                        battleLostOffsetY=-15;
                    }


                    this.player.positionX = this.player.positionX - battleLostOffsetX;
                    this.player.positionY = this.player.positionY - battleLostOffsetY;
                    this.player.offsetX=0;
                    this.player.offsetY=0;
                    conflictedPlayer.conflictWin = true;
                    return false;
                }
            }
        });
        return success;
    }

    getLostConflictPosition() {
        this.player
    }
}
