export default class Event {

    constructor(home, away, field, ball) {
        this.team1 = home;
        this.team2 = away;
        this.field = field;
        this.ball = ball;
        this.noConflict = false;
    }

    compile() {

        const allPlayers = this.team1.concat(this.team2);

        allPlayers.forEach((player) => {
            let decision = player.decide();

            if (decision === "move") {
                player.move(player.positionX, player.positionY);
                if (player.hasBall === true) {
                    this.ball.move(player.positionX, player.positionY);
                    this.ball.reRender();
                }
            }
            if (decision === "pass") {
                if (player.team === "red") {
                    player.pass(this.team1, this.ball);
                } else {
                    player.pass(this.team2, this.ball);
                }

            }
            if (decision === "shoot") {
                player.shoot();
                console.log('shot!');
            }
            let id = `#` + player.id;
            const $playerDiv = $(id);
            player.reRender(player.id, player.positionX, player.positionY, $playerDiv);
        });
    }
}
