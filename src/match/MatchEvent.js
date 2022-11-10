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
            let decision = player.decide();                                                                             // diagnostyka - wyswietlanie wyboru
            player.decision = decision;                                                                                  //


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

                player.decision = player.decision + " : " + decisionWhereToMove;                                        // diagnostyka - wyswietlanie wyboru

                if (player.isInAwayTeam) {
                    if (player.getOpponentWithBallInRange(this.homeTeam) !== false) {
                        player.decision += ": tryToWinTheBall";                                                         // diagnostyka - wyswietlanie wyboru
                        promises.push(player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.homeTeam)));
                    }
                } else {
                    if (player.getOpponentWithBallInRange(this.awayTeam) !== false) {
                        player.decision += ": tryToWinTheBall";                                                         // diagnostyka - wyswietlanie wyboru
                        promises.push(player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.awayTeam)));
                    }
                }

                this.showPlayerDecision(player);                                                                        // diagnostyka - wyswietlanie wyboru

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
