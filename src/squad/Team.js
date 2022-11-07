import NamesGenerator from '../names/NamesGenerator';
import PlayerDef from '../match/PlayerDef';
import Player from '../match/Player';

export default class Team {
    
    constructor(isAwayTeam = false) {
        
        /** @type {Map<Number, PlayerDef>} */
        this.squad = new Map();
        
        /** @type {Player[]} */
        this.firstSquad = [];
        
        this.positions = ["GK", "LD", "CLD", "CRD", "RD", "LM", "CLM", "CRM", "RM", "RF", "LF"];
        
        this.firstSquadDef = this.getFirstTeamPlayersNumbers();
        
        /** @type {Boolean} */
        this.isAwayTeam = isAwayTeam;
        
        this.teamColor = isAwayTeam ? 'blue' : 'red';
    }
    
    /**
     * For now we generate random team here
     */
    generateSquad(matchSquadNumberOfPlayersAllowed = 18) {
        for (let i = 0; i < matchSquadNumberOfPlayersAllowed; i++) {
            const name = NamesGenerator.generateName();
            const playerDef = new PlayerDef(i, name, this.positions[i])
            if (this.isAwayTeam) {
                playerDef.id = i + matchSquadNumberOfPlayersAllowed;
            }
            this.squad.set(i, playerDef);
        }
    }
    
    /**
     * @param {Number[]} numbers
     */
    setFirstTeamPlayersNumbers(numbers) {
        this.firstSquadDef = numbers;
    }
    
    /**
     * Returns number of players from first team
     *
     * @returns {number[]}
     */
    getFirstTeamPlayersNumbers() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }
    
    getMatchPlayers() {
        this.firstSquadDef.forEach((playerNumber) => {
            const playerDef = this.squad.get(playerNumber);
            const player = new Player(playerDef);
            player.setShitColor(this.teamColor);
            player.setIsInAwayTeam(this.isAwayTeam);
            this.firstSquad.push(player);
        });
        return this.firstSquad;
    }
    
    generatePosition(position, field) {
        let positionX = 0;
        let positionY = 0;
        
        //TODO: getFormation
        
        switch (position) {
            case 'GK':
                positionX = 0.033 * field.width; //40;
                positionY = 0.5 * field.width; //400;
                break;
            case 'LD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.125 * field.width; //*150;
                break;
            case 'CLD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.2916 * field.width; //350;
                break;
            case 'CRD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.375 * field.width; //450;
                break;
            case 'RD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.5416 * field.width; //650;
                break;
            case 'LM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.125 * field.width; //*1150;
                break;
            case 'CLM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.2916 * field.width; //350;
                break;
            case 'CRM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.375 * field.width; //450;
                break;
            case 'RM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.5416 * field.width; //650;
                break;
            case 'RF':
                positionX = 0.375 * field.width; //450;
                positionY = 0.2916 * field.width; //350;
                break;
            case 'LF':
                positionX = 0.375 * field.width; //450;
                positionY = 0.375 * field.width; //450;
                break;
        }
        return {positionX, positionY};
    }
}
