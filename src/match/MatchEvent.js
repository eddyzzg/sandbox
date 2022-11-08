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

    run() {
        const allPlayers = this.homeTeam.concat(this.awayTeam);
        allPlayers.forEach((player) => {
            let decision = player.decide();

            if (decision === "move") {
                {
                    let decisionWhereToMove = player.decideWhereToMove();
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

                }

                if (player.hasBall === true) {
                    return this.ball.move(player.positionX, player.positionY);
                }
            }

            if (decision === "pass") {
                if (player.isInAwayTeam) {
                    return player.pass(this.awayTeam, this.ball);
                } else {
                    return player.pass(this.homeTeam, this.ball);
                }
            }
            if (decision === "shoot") {
                return player.shoot();
            }
        });
    }
}
