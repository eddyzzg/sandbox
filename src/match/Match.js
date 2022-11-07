import Field from './Field';
import Event from './Event';
import Ball from './Ball';

export default class Match {
    
    /**
     * @param {Team} homeTeam
     * @param {Team} awayTeam
     */
    constructor(homeTeam, awayTeam) {
        this.field = new Field(1200, 800);
        
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        
        this.homePlayers = [];
        this.awayPlayers = [];
        
        this.ball = new Ball();
    }
    
    prepare() {
        this.field.render();
        
        this.homePlayers = this.homeTeam.getMatchPlayers();
        this.awayPlayers = this.awayTeam.getMatchPlayers();
        
        return this.placePlayersOnField().then(() => {
            this.renderBall();
            return this.placeForwardPlayerToTheMiddleOfTheField();
        });
    }
    
    start() {
        setInterval(() => {
            const event = new Event(this.homePlayers, this.awayPlayers, this.field.getDOMSelector(), this.ball);
            event.compile();
            // event.passEvent();
        }, 1000);
    }
    
    placePlayersOnField() {
        const $field = this.field.getDOMSelector();
        const animationsPromises = [];
        
        this.homePlayers.forEach((player) => {
            player.render($field);
            
            const startPosition = this.homeTeam.generatePosition(player.position);
            const movePromise = player.move(startPosition.positionX - 25, startPosition.positionY);
            
            animationsPromises.push(movePromise);
        });
        this.awayPlayers.forEach((player) => {
            player.setRightStartTeam();
            player.render($field);
            
            const startPosition = this.awayTeam.generatePosition(player.position);
            let movePromise = player.move(600 - startPosition.positionX + 525, startPosition.positionY);
            
            animationsPromises.push(movePromise);
        });
        
        return Promise.all(animationsPromises);
    }
    
    placeForwardPlayerToTheMiddleOfTheField() {
        const forwardPlayer = this.homePlayers[10];
        forwardPlayer.hasBall = true;
        return forwardPlayer.move(550, 355);
    }
    
    renderBall() {
        this.ball.render(this.field.getDOMSelector());
    }
}
