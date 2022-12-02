import NamesGenerator from '../names/NamesGenerator';
import PlayerDef from '../match/players/PlayerDef';
import Player from '../match/players/Player';

export default class Team {
    
    constructor(isAwayTeam = false) {
        /** @type {Boolean} */
        this.isAwayTeam = isAwayTeam;
        
        /** @type {Map<Number, PlayerDef>} */
        this.squad = new Map();
        /** @type {Player[]} */
        this.firstSquad = [];
        this.positions = ["GK", "LD", "CLD", "CRD", "RD", "LM", "CLM", "CRM", "RM", "RF", "LF"];
        this.firstSquadDef = this.getFirstTeamPlayersNumbers();
        
        this.hasBall = false;
        this.playerStartingGame = undefined;
        this.shirtColor = isAwayTeam ?  26 : 19;     // kolory z palety 30 kolorów zadeklarownych w avatar.js
        this.shortsColor = isAwayTeam ? 9 : 18;
    }
    
    setPlayerStartingGame(player) {
        this.playerStartingGame = player;
    }
    
    /**
     * For now we generate random team here
     */
    generateSquad(matchSquadNumberOfPlayersAllowed = 18) {
        for (let i = 0; i < matchSquadNumberOfPlayersAllowed; i++) {
            const name = NamesGenerator.generateName();
            const playerDef = new PlayerDef(i, name, this.positions[i],this.shirtColor,this.shortsColor)
            playerDef.avatar.generatePlayerAvatarParameters();
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
        // return this.isAwayTeam ? [] : [1];
        return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    }
    
    getMatchPlayers() {
        this.firstSquadDef.forEach((playerNumber) => {
            const playerDef = this.squad.get(playerNumber - 1);
            const player = new Player(playerDef, this);
            player.setShirtColor(this.shirtColor,this.shortsColor);
            player.setIsInAwayTeam(this.isAwayTeam);
            this.firstSquad.push(player);
        });
        return this.firstSquad;
    }
    
    generatePosition(position, field) {
        let positionX = 0;
        let positionY = 0;
        
        switch (position) {
            case 'GK':
                positionX = 0.033 * field.width; //40;
                positionY = 0.5 * field.height; //400;
                break;
            case 'LD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.187 * field.height; //*150;
                break;
            case 'CLD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.437 * field.height; //350;
                break;
            case 'CRD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.562 * field.height; //450;
                break;
            case 'RD':
                positionX = 0.083 * field.width; //100;
                positionY = 0.812 * field.height; //650;
                break;
            case 'LM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.187 * field.height; //*1150;
                break;
            case 'CLM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.437 * field.height; //350;
                break;
            case 'CRM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.562 * field.height; //450;
                break;
            case 'RM':
                positionX = 0.25 * field.width; //300;
                positionY = 0.812 * field.height; //650;
                break;
            case 'RF':
                positionX = 0.375 * field.width; //450;
                positionY = 0.437 * field.height; //350;
                break;
            case 'LF':
                positionX = 0.375 * field.width; //450;
                positionY = 0.562 * field.height; //450;
                break;
        }
        return {positionX, positionY};
    }
    
    generateNominalPosition(position, field) {
        let nominalPositionX = 0;
        let nominalPositionY = 0;
        
        //TODO: getFormation
        
        switch (position) {
            case 'GK':
                nominalPositionX = 0.066 * field.width; //
                nominalPositionY = 0.5 * field.height; //400;
                break;
            case 'LD':
                nominalPositionX = 0.166 * field.width; //
                nominalPositionY = 0.187 * field.height; //*150;
                break;
            case 'CLD':
                nominalPositionX = 0.166 * field.width; //;
                nominalPositionY = 0.437 * field.height; //350;
                break;
            case 'CRD':
                nominalPositionX = 0.166 * field.width; //;
                nominalPositionY = 0.562 * field.height; //450;
                break;
            case 'RD':
                nominalPositionX = 0.166 * field.width; //;
                nominalPositionY = 0.812 * field.height; //650;
                break;
            case 'LM':
                nominalPositionX = 0.5 * field.width; //300;
                nominalPositionY = 0.187 * field.height; //*1150;
                break;
            case 'CLM':
                nominalPositionX = 0.5 * field.width; //300;
                nominalPositionY = 0.437 * field.height; //350;
                break;
            case 'CRM':
                nominalPositionX = 0.5 * field.width; //300;
                nominalPositionY = 0.562 * field.height; //450;
                break;
            case 'RM':
                nominalPositionX = 0.5 * field.width; //300;
                nominalPositionY = 0.812 * field.height; //650;
                break;
            case 'RF':
                nominalPositionX = 0.75 * field.width; //450;
                nominalPositionY = 0.437 * field.height; //350;
                break;
            case 'LF':
                nominalPositionX = 0.75 * field.width; //450;
                nominalPositionY = 0.562 * field.height; //450;
                break;
        }
        return {nominalPositionX, nominalPositionY};
    }
}
