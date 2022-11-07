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
    
    generatePosition(position) {
        let positionX = 0;
        let positionY = 0;
        
        switch (position) {
            case 'GK':
                positionX = 40;
                positionY = 400;
                break;
            case 'LD':
                positionX = 100;
                positionY = 150;
                break;
            case 'CLD':
                positionX = 100;
                positionY = 350;
                break;
            case 'CRD':
                positionX = 100;
                positionY = 450;
                break;
            case 'RD':
                positionX = 100;
                positionY = 650;
                break;
            case 'LM':
                positionX = 300;
                positionY = 150;
                break;
            case 'CLM':
                positionX = 300;
                positionY = 350;
                break;
            case 'CRM':
                positionX = 300;
                positionY = 450;
                break;
            case 'RM':
                positionX = 300;
                positionY = 650;
                break;
            case 'RF':
                positionX = 450;
                positionY = 350;
                break;
            case 'LF':
                positionX = 450;
                positionY = 450;
                break;
        }
        return {positionX, positionY};
    }
}
