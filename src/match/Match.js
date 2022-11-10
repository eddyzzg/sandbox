import Field from './Field';
import MatchEvent from './MatchEvent';
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
        /** @type {Player[]} */
        this.homePlayers = [];
        /** @type {Player[]} */
        this.awayPlayers = [];
        this.ball = new Ball();
        window.match = this;

        this.matchDuration = 90;
        this.eventsPerMinute = 10;
        this.currentIndex = 0;
    }

    prepare() {
        this.field.render();
        this.homePlayers = this.homeTeam.getMatchPlayers();
        this.awayPlayers = this.awayTeam.getMatchPlayers();
        this.informPlayersAboutTheBall();
        return this.placePlayersOnField().then(() => {
            this.renderBall();
            return this.placeForwardPlayerToTheMiddleOfTheField();
        });
    }

    informPlayersAboutTheBall() {
        this.homePlayers.concat(this.awayPlayers).forEach((player) => {
            player.setBallInfo(this.ball)
        })
    }


    start() {
        const matchEvent = new MatchEvent(this.homePlayers, this.awayPlayers, this.ball);
        matchEvent.run().then(() => {
            const maxEventCount = this.matchDuration * this.eventsPerMinute;
            if (this.currentIndex <= maxEventCount) {
                this.currentIndex++;
                return this.start();
            }
            alert('MECZ SKONCZONY !');
        });

        /*
        setInterval(() => {
            const matchEvent = new MatchEvent(this.homePlayers, this.awayPlayers, this.ball);
            matchEvent.run();
            // matchEvent.passEvent();
        }, 1000);*/
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
        //console.log(this.homePlayers[10].team);
        forwardPlayer.setHasBall(true);
        return forwardPlayer.moveToXY(550, 355);
    }

    renderBall() {
        this.ball.render(this.field.getDOMSelector());
    }
}
