import Field from "./Field";
import Event from "./Event";
import Ball from "./Ball";

export default class Match {
    constructor(homePlayers, awayPlayers) {
        this.field = new Field(1200, 800);
        this.homePlayers = homePlayers;
        this.awayPlayers = awayPlayers;
        this.ball = new Ball();
    }
    
    start() {
        this.field.render();
        
        this.addPlayersToMatch();
        this.renderBall();
        this.placeForwardPlayerToTheMiddleOfTheField();
        
        setInterval(() => {
            const event = new Event(this.homePlayers, this.awayPlayers, this.field.getDOMSelector(), this.ball);
            event.compile();
            // event.passEvent();
        }, 1000);
    }
    
    addPlayersToMatch() {
        const $field = this.field.getDOMSelector();
        this.homePlayers.forEach((player) => {
            player.positionX = player.positionX - 25;
            player.render($field);
        })
        this.awayPlayers.forEach((player) => {
            player.positionX = 600 - player.positionX + 525;
            player.render($field);
        })
    }
    
    placeForwardPlayerToTheMiddleOfTheField() {
        const forwardPlayer = this.homePlayers[10];
        forwardPlayer.hasBall = true;
        forwardPlayer.positionX = 550;
        forwardPlayer.positionY = 355;
        forwardPlayer.reRender();
    }
    
    renderBall() {
        this.ball.render(this.field.getDOMSelector());
    }
}
