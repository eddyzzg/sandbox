export const DECISION_WHERE_TO_MOVE = {
    MOVE_TO_BALL: 'moveToBall',
    MOVE_TO_POSITION: 'moveToPosition',
    MOVE_TO_GOAL: 'moveToGoal'
}

export default class PlayerDecisionWhereToMove {
    constructor(player) {
        this.player = player;
        this.maxIndex = 100;
    }
    
    run() {
        const randomIndex = Math.round(Math.random() * 100);
        const {moveToBallRange, moveToPosRange, moveToGoalRange} = this.createRanges();
        
        if (randomIndex >= moveToBallRange.min && randomIndex <= moveToBallRange.max) {
            return DECISION_WHERE_TO_MOVE.MOVE_TO_BALL;
        }
        if (randomIndex > moveToPosRange.min && randomIndex <= moveToPosRange.max) {
            return DECISION_WHERE_TO_MOVE.MOVE_TO_POSITION;
        }
        if (randomIndex > moveToGoalRange.min && randomIndex <= moveToGoalRange.max) {
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
        if (this.player.hasBall) {
            return 0;
        }
        if (this.isCloseToOpponent()) {
            return 100;
        }
        return 20;
    }
    
    possibilityOfMoveToPosition() {
        if (this.player.hasBall) {
            return 0;
        }
        if (this.isCloseToOpponent()) {
            return 0;
        }
        return 70;
    }
    
    possibilityOfMoveToGoal() {
        if (this.player.hasBall) {
            return 100;
        }
        if (this.isCloseToOpponent()) {
            return 0;
        }
        return 10;
    }
    
    isCloseToOpponent() {
        return this.player.getDistanceTo(this.player.ball) < 150;
    }
}
