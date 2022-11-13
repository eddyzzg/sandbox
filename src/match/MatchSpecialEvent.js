import MatchEvent from "./MatchEvent";

export default class MatchSpecialEvent extends MatchEvent {
    
    /**
     * @param {Player[]} home
     * @param {Player[]} away
     * @param {Ball} ball
     * @param {Field} field
     * @param {Match} match
     * @param {MatchSpecialEventReport[]} [matchSpecialEventsReports]
     */
    constructor(home, away, ball, field, match, matchSpecialEventsReports = []) {
        super(home, away, ball, field, match);
        
        this.matchEvents = matchSpecialEventsReports;
    }
    
    run() {
        let promises = [];
        this.matchEvents.forEach((event) => {
            if (event.result === API.events.MATCH_EVENTS.AWAY_GOAL || event.result === API.events.MATCH_EVENTS.HOME_GOAL) {
                this.calculateMoves();
                promises.concat(this.executeMoves());
            }
        });
        return Promise.all(promises);
    }
    
    calculateMoves() {
        debugger
        this.getAllPlayers().forEach((player) => {
            this.calculateMoveToStartPosition(player);
        });
        this.calculateMoveBallToStartPosition();
    }
    
    executeMoves() {
        const promises = [];
        this.getAllPlayers().forEach((player) => {
            promises.push(player.executeMove());
        });
        promises.push(this.ball.executeMove());
        return promises;
    }
    
    calculateMoveToStartPosition(player) {
        player.moveToXY(player.startPositionX, player.startPositionY);
    }
    
    calculateMoveBallToStartPosition() {
        this.ball.move(this.ball.startPositionX, this.ball.startPositionY);
    }
    
}
