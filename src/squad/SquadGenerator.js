import Player from "../match/Player";
import NamesGenerator from "../names/NamesGenerator";

export default class SquadGenerator {

    constructor() {
        this.squad = [];
        this.positions = ["GK", "LD", "CLD", "CRD", "RD", "LM", "CLM", "CRM", "RM", "RF", "LF"];
    }

    generateSquad(team) {
        for (let i = 0; i < 11; i++) {
            let name = NamesGenerator.generateName();
            let player = new Player(i, name, this.positions[i], team);
            this.generatePosition(player);
            this.squad[i] = player;
       }
        return this.squad;
    }
    
    generatePosition(player){
            switch (player.position) {
                case 'GK':
                    player.positionX = 40;
                    player.positionY = 400;
                    break;
        
                case 'LD':
                    player.positionX = 100;
                    player.positionY = 150;
                    break;
                case 'CLD':
                    player.positionX = 100;
                    player.positionY = 350;
                    break;
                case 'CRD':
                    player.positionX = 100;
                    player.positionY = 450;
                    break;
                case 'RD':
                    player.positionX = 100;
                    player.positionY = 650;
                    break;
                case 'LM':
                    player.positionX = 300;
                    player.positionY = 150;
                    break;
                case 'CLM':
                    player.positionX = 300;
                    player.positionY = 350;
                    break;
                case 'CRM':
                    player.positionX = 300;
                    player.positionY = 450;
                    break;
                case 'RM':
                    player.positionX = 300;
                    player.positionY = 650;
                    break;
                case 'RF':
                    player.positionX = 450;
                    player.positionY = 350;
                    break;
                case 'LF':
                    player.positionX = 450;
                    player.positionY = 450;
                    break;
            
        }
        
    }
}
