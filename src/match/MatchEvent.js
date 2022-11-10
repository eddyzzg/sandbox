import MatchEventConflictManager from "./MatchEventConflictManager";

export default class MatchEvent {
    
    /**
     * @param {Player[]} home
     * @param {Player[]} away
     * @param {Ball} ball
     */
    constructor(home, away, ball) {
        this.homeTeam = home;
        this.awayTeam = away;
        this.ball = ball;
        this.conflictManger = new MatchEventConflictManager(this.getAllPlayers());
    }
    
    getAllPlayers() {
        return this.homeTeam.concat(this.awayTeam);
    }
    
    //FOR TEST
    passEvent() {
        return this.homeTeam[10].pass(this.homeTeam, this.ball);
    }

    showPlayerDecision(player) {
        let $decisionContainer = $(`#${player.id}`).find('.decision');
        $decisionContainer.html(player.decision);
    }

    run() {
        this.calculateDecisions();
        // this.resolveConflicts();
        return Promise.all(this.executeMoves());
    }
    
    calculateDecisions() {
        this.getAllPlayers().forEach((player) => {
            let decision = player.decide();
            player.decision = decision;  // zmienna wyświetlająca co ziomek chce zrobić
            
            this.showPlayerDecision(player);
            
            switch (decision) {
                case 'move': {
                    //TODO: przemyslec calculate dla pilki
                    this.calculateMoveDecision(player);
                    break;
                }
                case 'pass': {
                    this.calculatePassDecision(player);
                    break;
                }
                case 'shoot': {
                    this.calculateShootDecision(player);
                    break;
                }
            }
        
        });
    }
    
    executeMoves() {
        const promises = [];
        this.getAllPlayers().forEach((player) => {
            switch (player.decision) {
                case 'move': {
                    promises.push(player.executeMove());
                    break;
                }
                case 'pass': {
                    promises.push(this.ball.executeMove());
                    break;
                }
                case 'shoot': {
                    promises.push(Promise.resolve());
                    break;
                }
            }
            
        });
        return promises;
    }
    
    resolveConflicts() {
        this.getAllPlayers().forEach((player) => {
            this.conflictManger.validateMove(player);
        });
    }
    
    calculateMoveDecision(player) {
        let decisionWhereToMove = player.decideWhereToMove();
        if (decisionWhereToMove === "moveToBall") {
            player.moveInDirectionOfXY(this.ball.positionX, this.ball.positionY);
        } else if (decisionWhereToMove === "moveToPosition") {
            player.moveInDirectionOfXY(player.nominalPositionX, player.nominalPositionY);
        } else if (decisionWhereToMove === "moveToGoal") {
            if (player.isInAwayTeam === false) {
                player.moveInDirectionOfXY(1200, 400);
            } else {
                player.moveInDirectionOfXY(0, 400);
            }
        }
    
        if (player.isInAwayTeam) {
            if (player.getOpponentWithBallInRange(this.homeTeam) !== false) {
                player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.homeTeam));
            }
        } else {
            if (player.getOpponentWithBallInRange(this.awayTeam) !== false) {
                player.tryToWinTheBall(player, player.getOpponentWithBallInRange(this.awayTeam));
            }
        }
    
        if (player.hasBall === true) {
            this.ball.move(player.positionX, player.positionY);
        }
    }
    
    calculatePassDecision(player) {
        if (player.isInAwayTeam) {
            player.pass(this.awayTeam, this.ball);
        } else {
            player.pass(this.homeTeam, this.ball);
        }
    }
    
    calculateShootDecision(player) {
        player.shoot();
    }
}
