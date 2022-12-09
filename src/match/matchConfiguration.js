import matchConfigurationDefault from './DefaultConfig.json';

export default class MatchConfig {
    showConfig
    
    constructor() {
        this.params = this.loadDefaultParams();
    }
    
    loadDefaultParams() {
        const parsedJson = JSON.parse(matchConfigurationDefault)
        return new Map(Object.entries(parsedJson));
    }
    
    getParam(name) {
        return this.params.get(name);
    }
    
    setParam(name, value) {
        this.params.set(name, value);
    }
    
    getActualParams() {
        return JSON.stringify(this.params);
    }
}
