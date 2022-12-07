import GamePlayTools from './GamePlayTools';

export const DECISION = {
    MOVE: 'move',
    PASS: 'pass',
    SHOT: 'shot',
};

export default class PlayerDecisionEvent {
    constructor(player, homeTeam, awayTeam) {
        this.player = player;
        this.awayTeam = awayTeam;
        this.homeTeam = homeTeam;
        //       this.maxIndex = 100;
        
        this.tools = new GamePlayTools(this);
    }

    //diagnostic functionality
    // validator() {
    //     let possibilitySum = this.getPossibilityOfMove() + this.getPossibilityOfPass() + this.getPossibilityOfShoot();
    //     if (possibilitySum !== this.maxIndex) {
    //         alert('Sum of possibility not equal to max possibility !');
    //     }
    // }

    run() {
        const {moveRange, passRange, shootRange} = this.createRanges();
        const randomIndex = Math.round(Math.random() * shootRange.max);

        if (randomIndex >= moveRange.min && randomIndex <= moveRange.max) {
            return DECISION.MOVE;
        }
        if (randomIndex > passRange.min && randomIndex <= passRange.max) {
            return DECISION.PASS;
        }
        if (randomIndex > shootRange.min && randomIndex <= shootRange.max) {
            return DECISION.SHOT;
        }
    }

    createRanges() {
        const moveRange = {
            min: 0,
            max: this.getPossibilityOfMove()
        };
        const passRange = {
            min: moveRange.max,
            max: moveRange.max + this.getPossibilityOfPass()
        };
        const shootRange = {
            min: passRange.max,
            max: passRange.max + this.getPossibilityOfShoot()
        }
        return {moveRange, passRange, shootRange};
    }

    getPossibilityOfMove() {
        if (this.player.hasBall) {
            if (this.player.isInAwayTeam) {
                return this.getBestRunningDestination(this.homeTeam);
            } else {
                return this.getBestRunningDestination(this.awayTeam)
            }
        } else
            return 10;
    }


    getBestRunningDestination(oppositePlayers) {
        const goalCenterCoordinates = {
            positionX: 0,
            positionY: 0
        };
        if (this.player.isInAwayTeam) {
            goalCenterCoordinates.positionX = this.player.field.homeGoalX;
            goalCenterCoordinates.positionY = this.player.field.homeGoalY + this.player.field.goalHeight / 2;
        } else {
            goalCenterCoordinates.positionX = this.player.field.awayGoalX;
            goalCenterCoordinates.positionY = this.player.field.awayGoalY + this.player.field.goalHeight / 2;
        }

        let bestTunnelValue = 0;
        let r = this.player.getDistanceTo(goalCenterCoordinates);

        let runningDestinations = this.tools.getRunningDestinations(this.player, goalCenterCoordinates, r);
        runningDestinations.forEach((destination) => {
            if (bestTunnelValue < this.tools.getTunnelValue(oppositePlayers, destination)) {
                bestTunnelValue = this.tools.getTunnelValue(oppositePlayers, destination);
                this.player.destinationX = destination.positionX;
                this.player.destinationY = destination.positionY;

            }
        });

        return bestTunnelValue;
    }


    getPossibilityOfPass() {
        if (this.player.hasBall) {
            return 0;   // diagnostics
        }
        return 0;
    }

    getPossibilityOfShoot() {
        return 0;  // diagnostics
        /*if (this.player.hasBall) {
            let field = this.player.field;
            let awayGoal = {positionX: field.awayGoalX, positionY: field.awayGoalY};
            let homeGoal = {positionX: field.homeGoalX, positionY: field.homeGoalY};
            let distance = 0;

            if (this.player.isInAwayTeam) {
                distance = ((field.width / 2) - (this.player.getDistanceTo(homeGoal))) / 6;
                if (distance < 0) {
                    distance = 0;
                }
                return distance;

            } else if (!this.player.isInAwayTeam) {
                distance = ((field.width / 2) - (this.player.getDistanceTo(awayGoal))) / 6;
                if (distance < 0) {
                    distance = 0;
                }
                return distance;
            }
        }
        return 0;*/
    }

}
