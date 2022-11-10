export default class MatchEvent {

    /**
     * @param {Player[]} home
     * @param {Player[]} away
     * @param {Ball} ball
     */
    constructor(home, away, ball) {
        this.homeTeam = home;
        this.awayTeam = away;
        this.ball = ball;
        this.noConflict = false;
    }

    //FOR TEST
    passEvent() {
        return this.homeTeam[10].pass(this.homeTeam, this.ball);
    }

    showPlayerDecision(player) {
        let $decisionContainer = $(`#${player.id}`).find('.decision');
        $decisionContainer.html(player.decision);
    }

    run() {
        const promises = [];
        const allPlayers = this.homeTeam.concat(this.awayTeam);
        allPlayers.forEach((player) => {
            let decision = player.decide();
            player.decision = decision;  // zmienna wyświetlająca co ziomek chce zrobić

            this.showPlayerDecision(player);

            if (decision === "move") {
                let decisionWhereToMove = player.decideWhereToMove();
                if (decisionWhereToMove === "moveToBall") {
                    promises.push(player.moveInDirectionOfXY(this.ball.positionX, this.ball.positionY));
                } else if (decisionWhereToMove === "moveToPosition") {
                    promises.push(player.moveInDirectionOfXY(player.nominalPositionX, player.nominalPositionY));
                } else if (decisionWhereToMove === "moveToGoal") {
                    if (player.isInAwayTeam === false) {
                        promises.push(player.moveInDirectionOfXY(1200, 400));
                    } else {
                        promises.push(player.moveInDirectionOfXY(0, 400));
                    }
                }

                if (player.isInAwayTeam) {
                    if (player.getOpponentWithBallInRange(this.homeTeam) !== false) {
                        promises.push(player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.homeTeam)));
                    }
                } else {
                    if (player.getOpponentWithBallInRange(this.awayTeam) !== false) {
                        promises.push(player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.awayTeam)));
                    }
                }


                if (player.hasBall === true) {
                    promises.push(this.ball.move(player.positionX, player.positionY));
                }
            }

            if (decision === "pass") {
                if (player.isInAwayTeam) {
                    promises.push(player.pass(this.awayTeam, this.ball));
                } else {
                    promises.push(player.pass(this.homeTeam, this.ball));
                }
            }
            if (decision === "shoot") {
                player.shoot();
            }
        });

        return Promise.all(promises);
    }


}
