import Avatar from "../../faces/Avatar";

export default class PlayerDef {
    constructor(id, name, position, shirtColor, shortsColor) {
        this.id = id;
        this.name = name;
        this.nominalPosition = position;
        this.avatar = new Avatar(this.id, shirtColor, shortsColor);
        
        this.strength = Math.ceil(Math.random() * 100);
        this.speed = 30; // Math.ceil(Math.random() * 100) / 2;     // diagnostics
        this.power = Math.ceil(Math.random() * 100);
        this.passing = Math.ceil(Math.random() * 100);
        this.dribble = Math.ceil(Math.random() * 100);
        this.technique = Math.ceil(Math.random() * 100);
    }
    
    setSpeed(value) {
        this.speed = value;
    }
    
    setPower(value) {
        this.power = value;
    }
    
    setPassing(value) {
        this.passing = value;
    }
    
    getSpeed() {
        return this.speed;
    }
    
    getPower() {
        return this.power;
    }
    
    getPassing() {
        return this.passing;
    }
    
}
