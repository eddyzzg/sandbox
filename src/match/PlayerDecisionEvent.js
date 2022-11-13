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
        if (this.player.position === "GK") {
            return 10;
        } else {
            return 100;
        }
    }

    possibilityOfPass() {
        return this.player.hasBall ? 30 : 0;
    }

    possibilityOfShoot() {
        let awayGoal = {positionX:1200,positionY:400};
        let homeGoal = {positionX:0,positionY:400};
        let distance =0;

        if (!this.player.hasBall) {
            return 0;
        } else if (this.player.isInAwayTeam){
            distance=(600-(this.player.distance(homeGoal)))/6;
            if (distance<0) {distance=0;}
            return distance;
        } else if (!this.player.isInAwayTeam) {

            distance=(600-(this.player.distance(awayGoal)))/6;
            if (distance<0) {distance=0;}
            return distance;

        }
    }
}
