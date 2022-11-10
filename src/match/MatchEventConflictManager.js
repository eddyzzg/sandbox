const playerHeight = 10;
const playerWidth = 10;

export default class MatchEventConflictManager {
    constructor(allPlayers) {
        this.players = allPlayers;
    }
    
    validateMove() {
        this.players.forEach((player) => {
            const positionConflict = this.checkMyPositionWithRest(player);
            
            if (!positionConflict.success) {
                //TODO: do statystyk wygrana/przegrana batalia o miejsce
                positionConflict.executePositionBattle();
            }
        });
    }
    
    /**
     * @param {Player} inPlayer
     * @returns {PositionXConflictReport}
     */
    checkMyPositionWithRest(inPlayer) {
        const inPosX = inPlayer.positionX;
        const inPosY = inPlayer.positionY;
        
        const conflictReport = new PositionXConflictReport(inPlayer);
        this.players.forEach((player) => {
            const areaOccupiedByPlayerX = {from: player.positionX, to: player.positionX + playerWidth};
            const areaOccupiedByPlayerY = {from: player.positionY, to: player.positionY + playerHeight};
            
            if (inPosX >= areaOccupiedByPlayerX.from && inPosX <= areaOccupiedByPlayerX.to) {
                if (inPosY >= areaOccupiedByPlayerY.from && inPosY <= areaOccupiedByPlayerY.to) {
                    conflictReport.addConflict(player);
                }
            }
        });
        return conflictReport;
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
            if (strength > conflictedPlayer.definition.strength) {
                conflictedPlayer.positionX = conflictedPlayer.positionX - playerWidth;
                conflictedPlayer.positionY = conflictedPlayer.positionY - playerHeight;
                return true;
            } else {
                success = false;

                this.player.positionX = this.player.positionX - playerWidth;
                this.player.positionY = this.player.positionY - playerHeight;
                
                return false;
            }
        });
        return success;
    }
}
