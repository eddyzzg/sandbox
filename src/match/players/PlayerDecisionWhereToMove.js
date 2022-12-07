export const DECISION_WHERE_TO_MOVE = {
    MOVE_TO_BALL: 'moveToBall',
    MOVE_TO_POSITION: 'moveToPosition',
    MOVE_TO_GOAL: 'moveToGoal'
}

export default class PlayerDecisionWhereToMove {
    constructor(player) {
        this.player = player;
        //    this.maxIndex = 100;
    }

    run() {
        const {moveToBallRange, moveToPosRange, moveToGoalRange} = this.createRanges();
        const randomIndex = Math.round(Math.random() * moveToGoalRange.max);

        if (randomIndex >= moveToBallRange.min && randomIndex <= moveToBallRange.max) {
            this.player.destinationX = this.player.ball.positionX;
            this.player.destinationY = this.player.ball.positionY;
            return DECISION_WHERE_TO_MOVE.MOVE_TO_BALL;
        }
        if (randomIndex > moveToPosRange.min && randomIndex <= moveToPosRange.max) {
            this.player.destinationX = this.player.nominalPositionX;
            this.player.destinationY = this.player.nominalPositionY;
            return DECISION_WHERE_TO_MOVE.MOVE_TO_POSITION;
        }
        if (randomIndex > moveToGoalRange.min && randomIndex <= moveToGoalRange.max) {
            // if (this.player.isInAwayTeam) {
            //     this.player.destinationX=this.player.field.homeGoalX;
            //     this.player.destinationY=this.player.field.homeGoalY + (this.player.field.goalHeight / 2);
            // } else {
            //     this.player.destinationX=this.player.field.awayGoalX;
            //     this.player.destinationY=this.player.field.awayGoalY + (this.player.field.goalHeight / 2);
            // }
            return DECISION_WHERE_TO_MOVE.MOVE_TO_GOAL;
        }
    }

    createRanges() {
        const moveToBallRange = {
            min: 0,
            max: this.possibilityOfMoveToBall()
        };
        const moveToPosRange = {
            min: moveToBallRange.max,
            max: moveToBallRange.max + this.possibilityOfMoveToPosition()
        };
        const moveToGoalRange = {
            min: moveToPosRange.max,
            max: moveToPosRange.max + this.possibilityOfMoveToGoal()
        }
        return {moveToBallRange, moveToPosRange, moveToGoalRange};
    }

    possibilityOfMoveToBall() {
        if (!this.player.hasBall && this.isCloseToOpponent()) {
            return 100;
        }
        return 0;
    }

    possibilityOfMoveToPosition() {
        if (this.player.hasBall || this.isCloseToOpponent()) {
            return 0;
        }
        return 10;
    }

    possibilityOfMoveToGoal() {
        if (this.player.hasBall) {
            return 100;
        }
        return 0;
    }

    isCloseToOpponent() {
        if (this.player.team.hasBall !== true) {
            return this.player.getDistanceTo(this.player.ball) < 100;
        }
        return false;
    }
}
