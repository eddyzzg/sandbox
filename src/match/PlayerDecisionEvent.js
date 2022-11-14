export const DECISION = {
    MOVE: 'move',
    PASS: 'pass',
    SHOT: 'shot'
};

export default class PlayerDecisionEvent {
    constructor(player) {
        this.player = player;
        this.maxIndex = 100;
    }
    
    //diagnostic functionality
    validator() {
        let possibilitySum = this.getPossibilityOfMove() + this.getPossibilityOfPass() + this.getPossibilityOfShoot();
        if (possibilitySum !== this.maxIndex) {
            alert('Sum of possibility not equal to max possibility !');
        }
    }
    
    run() {
        const randomIndex = Math.round(Math.random() * 100);
        const {moveRange, passRange, shootRange} = this.createRanges();
        
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
            return 65;
        }
        return 100;
    }
    
    getPossibilityOfPass() {
        if (this.player.hasBall) {
            return 20;
        }
        return 0;
    }
    
    getPossibilityOfShoot() {
        if (this.player.hasBall) {
            let field = this.player.field;
            let awayGoal = {positionX: field.awayGoalX, positionY: field.awayGoalY};
            let homeGoal = {positionX: field.homeGoalX, positionY: field.homeGoalY};
            let distance = 0;
            
            if (this.player.isInAwayTeam) {
                distance = ((field.width / 2) - (this.player.distance(homeGoal))) / 6;
                if (distance < 0) {
                    distance = 0;
                }
                return distance;
                
            } else if (!this.player.isInAwayTeam) {
                distance = ((field.width / 2) - (this.player.distance(awayGoal))) / 6;
                if (distance < 0) {
                    distance = 0;
                }
                return distance;
            }
        }
        return 0;
    }
    
}
