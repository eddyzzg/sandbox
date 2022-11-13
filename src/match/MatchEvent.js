import MatchEventConflictManager from "./MatchEventConflictManager";

export default class MatchEvent {

    /**
     * @param {Player[]} home
     * @param {Player[]} away
     * @param {Ball} ball
     * @param {Field} field
     * @param {Match} match
     */
    constructor(home, away, ball,field,match) {
        this.homeTeam = home;
        this.awayTeam = away;
        this.ball = ball;
        this.field=field;
        this.matchSpecialEvents = [];
        this.conflictManger = new MatchEventConflictManager(this.getAllPlayers(),this.ball,this.field,match);
    }

    getAllPlayers() {
        return this.homeTeam.concat(this.awayTeam);
    }

    //FOR TEST
    passEvent() {
        return this.homeTeam[10].pass(this.homeTeam, this.ball);
    }

    showPlayerDecision(player) {
        let $decisionContainer = $(`#${player.id}`).find('.decision');
        $decisionContainer.html(player.finalDecision);
    }

    run() {
        this.calculateDecisions();
        this.resolveConflicts();
        return Promise.all(this.executeMoves());
    }

    calculateDecisions() {
        this.getAllPlayers().forEach((player) => {
            let decision = player.decide();
            let finalDecision = '';

            switch (decision) {
                case 'move': {
                    //TODO: przemyslec calculate dla pilki
                    finalDecision = this.calculateMoveDecision(player);
                    break;
                }
                case 'pass': {
                    this.calculatePassDecision(player);
                    break;
                }
                case 'shoot': {
                    this.calculateShootDecision(player);
                    break;
                }
            }

            player.decision = decision;  // zmienna zawierajaca decyzje co ziomek chce zrobić,
            player.finalDecision = `${decision} / ${finalDecision}`;  // zmienna zawierajaca decyzje co ziomek chce zrobić,
            this.showPlayerDecision(player);    // wyswietlenie co ziomek chce zrobic
        });
    }

    executeMoves() {
        const promises = [];
        this.getAllPlayers().forEach((player) => {
            switch (player.decision) {
                case 'move': {
                    promises.push(player.executeMove());
                    if (player.hasBall) {
                        promises.push(this.ball.executeMove());
                    }
                    break;
                }
                case 'pass': {
                    promises.push(this.ball.executeMove());
                    break;
                }
                case 'shoot': {
                    promises.push(this.ball.executeMove());
                    break;
                }
            }
        });
        return promises;
    }

    resolveConflicts() {
        this.getAllPlayers().forEach((player) => {
            this.conflictManger.validateMove(player);
        });
        this.matchSpecialEvents.push(this.conflictManger.checkGoal());
    }

    calculateMoveDecision(player) {
        let finalDecision;
        let decisionWhereToMove = player.decideWhereToMove();

        // if (player.hasBall) {
        //     console.log(player.name);
        // console.log(decisionWhereToMove);}


        if (decisionWhereToMove === "moveToBall") {
            player.moveInDirectionOfXY(this.ball.positionX, this.ball.positionY);
        } else if (decisionWhereToMove === "moveToPosition") {
            player.moveInDirectionOfXY(player.nominalPositionX, player.nominalPositionY);
        } else if (decisionWhereToMove === "moveToGoal") {
            if (player.isInAwayTeam === false) {
                player.moveInDirectionOfXY(1200, 400);
            } else {
                player.moveInDirectionOfXY(0, 400);
            }
        }
        finalDecision = decisionWhereToMove;

        if (player.isInAwayTeam) {
            if (player.getOpponentWithBallInRange(this.homeTeam) !== false) {
                player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.homeTeam));
                finalDecision = 'tryToWinTheBall';
            }
        } else {
            if (player.getOpponentWithBallInRange(this.awayTeam) !== false) {
                player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.awayTeam));
                finalDecision = 'tryToWinTheBall';
            }
        }

        if (player.hasBall === true) {
            this.ball.move(player.positionX, player.positionY);
        }
        return finalDecision;
    }

    calculatePassDecision(player) {
        if (player.isInAwayTeam) {
            player.pass(this.awayTeam, this.ball);
        } else {
            player.pass(this.homeTeam, this.ball);
        }
    }

    calculateShootDecision(player) {
        player.shoot();
    }
}
