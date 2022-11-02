export default class Event {

    constructor(home, away) {
        this.team1 = home;
        this.team2 = away;

        this.noConflict = false;
    }

    compile() {
        let allPlayers = this.team1.append(this.team2);
        allPlayers.forEach((player) => {
            const {x, y} = player.makeMove();

            this.checkConfilct()
        });
    }
}
