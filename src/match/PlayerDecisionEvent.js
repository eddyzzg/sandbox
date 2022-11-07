export default class PlayerDecisionEvent {
    constructor(player) {
        this.player = player;

        this.decisionArray = [];
        this.index = 0;
        this.drawMove();
        this.drawPass();
        this.drawShoot();


    }


    run() {
        const randomIndex = Math.ceil(Math.random() * (this.index - 1));
        return this.decisionArray[randomIndex];
    }


    where() {
        const randomIndex = Math.ceil(Math.random() * (this.index - 1));
        return this.decisionArray[randomIndex];
    }


    drawMove() {
        for (let i = 0; i < this.possibilityOfMove(); i++) {
            this.decisionArray[i + this.index] = "move";
        }
        this.index += this.possibilityOfMove();
    }

    drawPass() {
        for (let i = 0; i < this.possibilityOfPass(); i++) {
            this.decisionArray[i + this.index] = "pass";
        }
        this.index += this.possibilityOfPass();
    }

    drawShoot() {
        for (let i = 0; i < this.possibilityOfShoot(); i++) {
            this.decisionArray[i + this.index] = "shoot";
        }
        this.index += this.possibilityOfShoot();
    }


    possibilityOfMove() {
        return 100;
    }

    possibilityOfPass() {
        return this.player.hasBall ? 100 : 0;
    }

    possibilityOfShoot() {
        return this.player.hasBall ? 10 : 0;
    }


}
