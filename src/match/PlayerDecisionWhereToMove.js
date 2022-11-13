export default class PlayerDecisionWhereToMove {
    constructor(player) {
        this.player = player;
        this.decisionArray = [];
        this.index = 0;
        this.drawMoveToBall();
        this.drawMoveToPosition();
        this.drawMoveToGoal();
    }


    run() {
        const randomIndex = Math.ceil(Math.random() * (this.index - 1));
        return this.decisionArray[randomIndex];
    }


    drawMoveToBall() {
        for (let i = 0; i < this.possibilityOfMoveToBall(); i++) {
            this.decisionArray[i + this.index] = "moveToBall";
        }
        this.index += this.possibilityOfMoveToBall();
    }

    drawMoveToPosition() {
        for (let i = 0; i < this.possibilityOfMoveToPosition(); i++) {
            this.decisionArray[i + this.index] = "moveToPosition";
        }
        this.index += this.possibilityOfMoveToPosition();
    }

    drawMoveToGoal() {
        for (let i = 0; i < this.possibilityOfMoveToGoal(); i++) {
            this.decisionArray[i + this.index] = "moveToGoal";
        }
        this.index += this.possibilityOfMoveToGoal();
    }


    possibilityOfMoveToBall() {

        if (this.player.hasBall === true) {
            return 0;
        }
        if (((this.player.distance(this.player.ball)) < 150) && !this.player.team.hasBall) {     // idz do piły jeżeli ma ją przeciwnik w odległości <150
            return 100;
        }
        return 0;
    }

    possibilityOfMoveToPosition() {
        if (this.player.position === "GK") {
            return 80;
        } else {
            return 20;
        }
    }

    possibilityOfMoveToGoal() {
        if (this.player.position === "GK") {
            return 1;
        } else if (this.player.hasBall === true) {
            return 90;
        } else if(this.player.team.hasBall){
            return 20;
        }
            return 5;

    }
}
