import matchConfigurationDefault from './defaultConfig.json';
import tmp from './paramsCofigurationPanel.hbs';

const CONFIG_PANEL = 'configuration';

export default class MatchConfig {
    constructor() {
        this.params = this.loadDefaultParams();
    }
    
    getContainerSelector() {
        return $(`.${CONFIG_PANEL}`);
    }
    
    /**
     * @param {HTMLDivElement} buttonsContainer
     */
    showConfigurationPanel(buttonsContainer) {
        //add button
        // $(buttonsContainer)
        
        //get my container and render there
        const model = [];
        
        for (let [key, value] of this.params) {
            let el = {
                name: key,
                value: value
            };
            model.push(el);
        }
        
        let html = tmp({params: model});
        this.getContainerSelector().append(html);
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
