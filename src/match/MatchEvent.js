import MatchEventConflictManager from "./MatchEventConflictManager";
import {DECISION} from './players/PlayerDecisionEvent';
import {ConsoleEvent} from "./tools/MatchTools";

export default class MatchEvent {
    
    /**
     * @param {Player[]} home
     * @param {Player[]} away
     * @param {Ball} ball
     * @param {Field} field
     * @param {Match} match
     */
    constructor(home, away, ball, field, match) {
        this.homeTeam = home;
        this.awayTeam = away;
        this.ball = ball;
        this.field = field;
        this.matchSpecialEvents = [];
        this.match = match;
        this.conflictManger = new MatchEventConflictManager(this.getAllPlayers(), this.ball, this.field, this.match);
    }
    
    getAllPlayers() {
        return this.homeTeam.concat(this.awayTeam);
    }
    
    //FOR TEST
    passEvent() {
        return this.homeTeam[10].passToClosestTeammate(this.homeTeam, this.ball);
    }
    
    showPlayerDecision(player) {
        let $decisionContainer = $(`#${player.id}`).find('.decision');
        $decisionContainer.html(player.finalDecision);
        
        this.match.tools.logConsoleEvent(new ConsoleEvent(player.getLogName(), this.match.currentIndex, player.finalDecision));
    }
    
    run() {
        this.calculateDecisions();
        this.resolveConflicts();
        return Promise.all(this.executeMoves());
    }
    
    calculateDecisions() {
        this.getAllPlayers().forEach((player) => {
            
            let decision = player.decide(this.homeTeam, this.awayTeam);
            let finalDecision = '';
            
            switch (decision) {
                case DECISION.MOVE: {
                    //TODO: przemyslec calculate dla pilki
                    finalDecision = this.calculateMoveDecision(player);
                    break;
                }
                case DECISION.PASS: {
                    this.calculatePassDecision(player);
                    break;
                }
                case DECISION.SHOT: {
                    this.calculateShootDecision(player);
                    break;
                }
            }
            
            player.decision = decision;  // zmienna zawierajaca decyzje co ziomek chce zrobić,
            player.finalDecision = `${decision} / ${finalDecision}`;  // zmienna zawierajaca decyzje co ziomek chce zrobić,
            
            this.showPlayerDecision(player);    // wyswietlenie co ziomek chce zrobic
        });
    }
    
    executeMoves() {
        const promises = [];
        this.getAllPlayers().forEach((player) => {
            switch (player.decision) {
                case DECISION.MOVE: {
                    promises.push(player.executeMove());
                    if (player.hasBall) {
                        promises.push(this.ball.executeMove());
                    }
                    break;
                }
                case DECISION.PASS: {
                    promises.push(this.ball.executeMove());
                    break;
                }
                case DECISION.SHOT: {
                    promises.push(this.ball.executeMove());
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
        this.matchSpecialEvents.push(this.conflictManger.checkGoal());
    }
    
    calculateMoveDecision(player) {
        let finalDecisionToShow = player.decideWhereToMove();
        player.moveInDirectionOfXY(player.destinationX, player.destinationY);
        
        finalDecisionToShow = this.tryToWinTheBall(player, finalDecisionToShow);
        this.moveBallWithPlayer(player);
        return finalDecisionToShow;
    }
    
    moveBallWithPlayer(player) {
        if (player.hasBall === true) {
            this.ball.move(player.positionX, player.positionY);
        }
    }
    
    tryToWinTheBall(player, finalDecisionToShow) {
        let team = player.isInAwayTeam ? this.homeTeam : this.awayTeam;
        if (player.getOpponentWithBallInRange(team)) {
            player.tryToWinTheBall(player, player.getOpponentWithBallInRange(team));
            finalDecisionToShow = 'tryToWinTheBall';
        }
        return finalDecisionToShow;
    }
    
    calculatePassDecision(player) {
        player.pass(player, this.ball);
    }
    
    calculateShootDecision(player) {
        player.shoot();
    }
}
