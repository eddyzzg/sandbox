export default class Event {

    constructor(home, away) {
        this.team1 = home;
        this.team2 = away;
        this.noConflict = false;
    }

    compile() {

        const allPlayers = this.team1.concat(this.team2);
        allPlayers.forEach((player) => {
            player.move(player.positionX, player.positionY);
            let id = `#` + player.id;
            const $playerDiv = $(id);
            player.reRender(player.id, player.positionX, player.positionY, $playerDiv);
        });
    }
}
