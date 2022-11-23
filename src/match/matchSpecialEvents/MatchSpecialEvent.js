import MatchEvent from "../MatchEvent";
import GoalMatchEvent from "./GoalMatchEvent";

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
                const goalEvent = new GoalMatchEvent(this.homeTeam, this.awayTeam, this.ball, this.field, this.match, this.matchEvents);
                promises.concat(goalEvent.create());
            }
        });
        return Promise.all(promises);
    }
    
}
