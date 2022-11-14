import Field from './Field';
import MatchEvent from './MatchEvent';
import Ball from './Ball';
import scoreboard from './scoreboard.hbs';
import MatchSpecialEvent from "./MatchSpecialEvent";

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
        this.awayGoals = 0;
        
        this.homePlayerStarterPosX = 606;
        this.homePlayerStarterPosY = 401;
    }
    
    renderScoreboard() {
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
            return this.placeForwardPlayerAndBallOnTheMiddleOfTheField().then(() => {
                return this.waitAWhileBeforeKickOff();
            });
        });
    }
    
    waitAWhileBeforeKickOff() {
        return new Promise((resolve) => setTimeout(resolve, 500));
    }
    
    addEventsListeners() {
        this.goalScoredListener = (teamId) => {
            if ('HOME' === teamId) {
                this.homeGoals++;
            } else if ('AWAY' === teamId) {
                this.awayGoals++;
            }
            this.renderScoreboard();
        };
        API.eventBus.addListener(API.events.MATCH_EVENTS.GOAL_SCORED, this.goalScoredListener.bind(this));
    }
    
    informPlayersAboutTheBallAndField() {
        this.homePlayers.concat(this.awayPlayers).forEach((player) => {
            player.setBallInfo(this.ball);
            player.setFieldInfo(this.field);
        })
    }
    
    start() {
        const matchEvent = new MatchEvent(this.homePlayers, this.awayPlayers, this.ball, this.field, this);
        return matchEvent.run().then(() => {
            const matchSpecialEventsReports = matchEvent.matchSpecialEvents;
            const matchSpecialEvent = new MatchSpecialEvent(this.homePlayers, this.awayPlayers, this.ball, this.field, this, matchSpecialEventsReports);
            
            return matchSpecialEvent.run().then(() => {
                const maxEventCount = this.matchDuration * this.eventsPerMinute;
                if (this.currentIndex <= maxEventCount) {
                    this.currentIndex++;
                    this.renderScoreboard();
                    return this.start();
                }
                alert("MECZ SKONCZONY !");
            });
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
            player.startPositionX = startPosition.positionX - 25;
            player.startPositionY = startPosition.positionY;
            player.moveToXY(player.startPositionX, player.startPositionY);
            animationsPromises.push(player.executeMove());
            
        });
        this.awayPlayers.forEach((player) => {
            player.setRightStartTeam();
            player.render($field);
            const positions = this.homeTeam.generateNominalPosition(player.position, this.field);
            player.setNominalPosition(1200 - positions.nominalPositionX, positions.nominalPositionY);
            
            const startPosition = this.awayTeam.generatePosition(player.position, this.field);
            player.startPositionX = 600 - startPosition.positionX + 525;
            player.startPositionY = startPosition.positionY;
            player.moveToXY(player.startPositionX, player.startPositionY);
            animationsPromises.push(player.executeMove());
        });
        
        return Promise.all(animationsPromises);
    }
    
    placeForwardPlayerAndBallOnTheMiddleOfTheField() {
        const promises = [];
        const forwardPlayer = this.homePlayers[10];
        forwardPlayer.setHasBall(true);
        forwardPlayer.moveToXY(this.homePlayerStarterPosX, this.homePlayerStarterPosY);
        promises.push(forwardPlayer.executeMove());
        
        this.ball.startPositionX = 614;
        this.ball.startPositionY = 392;
        this.ball.move(this.ball.startPositionX, this.ball.startPositionY);
        promises.push(this.ball.executeMove());
        
        return Promise.all(promises);
    }
    
    renderBall() {
        this.ball.render(this.field.getDOMSelector());
    }
    
    dispose() {
        API.eventBus.remove(API.events.MATCH_EVENTS.GOAL_SCORED, this.goalScoredListener);
    }
}
