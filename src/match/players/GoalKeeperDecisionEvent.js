import PlayerDecisionEvent from './PlayerDecisionEvent';

export default class GoalKeeperDecisionEvent extends PlayerDecisionEvent {
    constructor(player) {
        super(player);
    }
    
    getPossibilityOfMove() {
        if (this.player.hasBall) {
            return 9;
        }
        return 100;
    }
    
    getPossibilityOfPass() {
        if (this.player.hasBall) {
            return 90;
        }
        return 0;
    }
    
    getPossibilityOfShoot() {
        if (this.player.hasBall) {
            return 1;
        }
        return 0;
    }
    
}
