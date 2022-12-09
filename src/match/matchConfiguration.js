import matchConfigurationDefault from './defaultConfig.json';

export default class MatchConfig {
    constructor() {
        this.params = this.loadDefaultParams();
    }
    
    showConfigurationPanel() {
    
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
