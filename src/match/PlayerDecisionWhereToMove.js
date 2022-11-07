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
        return 20;
    }

    possibilityOfMoveToPosition() {

        return 100;
    }

    possibilityOfMoveToGoal() {
        return 10;
    }


}
