import Player from "../match/Player";
import NamesGenerator from "../names/NamesGenerator";

export default class SquadGenerator {

    constructor() {
        this.squad = [];
        this.positions = ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "F", "F"];
    }

    generateSquad(team) {
        for (let i = 0; i < 11; i++) {
            let name = "";
            name = NamesGenerator.generateName();
            this.squad[i] = new Player(i, name, this.positions[i], team);
        }
        return this.squad;
    }
}