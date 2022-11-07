import Player from '../match/Player';
import NamesGenerator from '../names/NamesGenerator';
import PlayerDef from '../match/PlayerDef';

export default class Team {
    
    constructor() {
        this.squad = [];
        this.positions = ["GK", "LD", "CLD", "CRD", "RD", "LM", "CLM", "CRM", "RM", "RF", "LF"];
    }
    
    generateSquad(team) {
        const TEAMS_PLAYERS_AMOUNT = 11;
        for (let i = 0; i < TEAMS_PLAYERS_AMOUNT; i++) {
            const name = NamesGenerator.generateName();
            const playerDef = new PlayerDef(i, name, this.positions[i], team)
            const player = new Player(playerDef);
            if (team === 'blue') {
                player.id = i + TEAMS_PLAYERS_AMOUNT;
            }
            // this.generatePosition(player);
            this.squad[i] = player;
        }
        return this.squad;
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
