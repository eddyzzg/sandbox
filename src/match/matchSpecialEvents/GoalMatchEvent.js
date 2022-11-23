import MatchEvent from "../MatchEvent";

export default class GoalMatchEvent extends MatchEvent {
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
    }
    
    create() {
        let promises = [];
        this.calculateMoves();
        promises.concat(this.executeMoves());
        return promises;
    }
    
    calculateMoves() {
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
        promises.push(this.match.waitAWhileBeforeKickOff())
        return promises;
    }
    
    calculateMoveToStartPosition(player) {
        player.moveToXY(player.startPositionX, player.startPositionY);
    }
    
    calculateMoveBallToStartPosition() {
        this.ball.move(this.ball.startPositionX, this.ball.startPositionY);
    }
}
