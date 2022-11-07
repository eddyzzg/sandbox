export default class PlayerDef {
    constructor(id, name, position, team) {
        this.id = id;
        this.name = name;
        this.nominalPosition = position;
        this.team = team;
        
        this.speed = Math.ceil(Math.random() * 100);
        this.power = Math.ceil(Math.random() * 100);
        this.passing = Math.ceil(Math.random() * 100);
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