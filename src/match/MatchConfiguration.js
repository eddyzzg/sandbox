import matchConfigurationDefault from './defaultConfig.json';

export default class MatchConfig {
    constructor() {
        this.params = this.loadDefaultParams();
    }
    
    showConfigurationPanel() {
    
    }
    
    loadDefaultParams() {
        return new Map(Object.entries(matchConfigurationDefault));
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
