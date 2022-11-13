import Field from './Field';
import MatchEvent from './MatchEvent';
import Ball from './Ball';
import scoreboard from './scoreboard.hbs';

export default class Match {
    
    /**
     * @param {Team} homeTeam
     * @param {Team} awayTeam
     */
    constructor(homeTeam, awayTeam) {
        this.field = new Field(1200, 800);
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        /** @type {Player[]} */
        this.homePlayers = [];
        /** @type {Player[]} */
        this.awayPlayers = [];
        this.ball = new Ball();
        // window.match = this;

        this.matchDuration = 90;
        this.eventsPerMinute = 10;
        this.currentIndex = 0;
        this.homeGoals = 0;
        this.awayGoals =0;
    }

    renderScoreboard(){
        const $scoreboardContainer = $("body .score-board");
        $scoreboardContainer.html(scoreboard(this));
    }

    prepare() {
        this.field.render();
        this.renderScoreboard();
        this.addEventsListeners();
        this.homePlayers = this.homeTeam.getMatchPlayers();
        this.awayPlayers = this.awayTeam.getMatchPlayers();
        this.informPlayersAboutTheBallAndField();
        return this.placePlayersOnField().then(() => {
            this.renderBall();
            return this.placeForwardPlayerToTheMiddleOfTheField();
        });
    }
    
    addEventsListeners() {
        const self = this;
        API.eventBus.addListener(API.events.MATCH_EVENTS.GOAL_SCORED, (teamId) => {
            if ('HOME' === teamId) {
                this.homeGoals++;
            } else if ('AWAY' === teamId) {
                this.awayGoals++;
            }
            self.renderScoreboard();
        });
    }
    
    informPlayersAboutTheBallAndField() {
        this.homePlayers.concat(this.awayPlayers).forEach((player) => {
            player.setBallInfo(this.ball);
            player.setFieldInfo(this.field);
        })
    }

    start() {
        const matchEvent = new MatchEvent(this.homePlayers, this.awayPlayers, this.ball,this.field,this);
        matchEvent.run().then(() => {
            const maxEventCount = this.matchDuration * this.eventsPerMinute;
            if (this.currentIndex <= maxEventCount) {
                this.currentIndex++;
                this.renderScoreboard();
                return this.start();
            }
            alert("MECZ SKONCZONY !");
        });


    }
    
    placePlayersOnField() {
        const $field = this.field.getDOMSelector();
        const animationsPromises = [];
        
        this.homePlayers.forEach((player) => {
            player.render($field);
            const positions = this.homeTeam.generateNominalPosition(player.position, this.field);
            player.setNominalPosition(positions.nominalPositionX, positions.nominalPositionY);
            
            const startPosition = this.homeTeam.generatePosition(player.position, this.field);
            const movePromise = player.moveToXY(startPosition.positionX - 25, startPosition.positionY);
            animationsPromises.push(movePromise);
            
        });
        this.awayPlayers.forEach((player) => {
            player.setRightStartTeam();
            player.render($field);
            const positions = this.homeTeam.generateNominalPosition(player.position, this.field);
            player.setNominalPosition(1200 - positions.nominalPositionX, positions.nominalPositionY);
            const startPosition = this.awayTeam.generatePosition(player.position, this.field);
            let movePromise = player.moveToXY(600 - startPosition.positionX + 525, startPosition.positionY);
            
            animationsPromises.push(movePromise);
        });
        
        return Promise.all(animationsPromises);
    }
    
    placeForwardPlayerToTheMiddleOfTheField() {
        const forwardPlayer = this.homePlayers[10];
        forwardPlayer.setHasBall(true);
        return forwardPlayer.moveToXY(550, 355);
    }
    
    renderBall() {
        this.ball.render(this.field.getDOMSelector());
    }
}
