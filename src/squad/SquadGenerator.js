import Player from "../match/Player";
import NamesGenerator from "../names/NamesGenerator";

export default class SquadGenerator {

    constructor() {
        this.squad = [];
        this.positions = ["GK", "LB", "CB", "CB", "RB", "LM", "CM", "CM", "RM", "F", "F", "GK", "LB", "CB", "CM", "RB", "F"];
    }

    generateSquad() {
        for (let i = 0; i < 16; i++) {
            let name = "";
            name = NamesGenerator.generateName();
            this.squad[i] = new Player(i, name, this.positions[i]);
        }
        return this.squad;
    }
}