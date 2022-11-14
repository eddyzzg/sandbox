import PlayerDecisionWhereToMove from "./PlayerDecisionWhereToMove";

export default class GoalKeeperDecisionWhereToMove extends PlayerDecisionWhereToMove {
    constructor(player) {
        super(player);
    }
    
    possibilityOfMoveToBall() {
        return 2;
    }
    
    possibilityOfMoveToPosition() {
        return 20;
    }
    
    possibilityOfMoveToGoal() {
        return 20;
    }
    
}
