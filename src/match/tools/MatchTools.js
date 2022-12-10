import MatchConfig from "./MatchConfiguration";

export default class MatchTools {
    constructor(match) {
        /** @type {HTMLDivElement} */
        this.container = document.getElementsByClassName('control-buttons')[0];
        
        /** @type {Match} */
        this.match = match;
        
        /** @type {HTMLDivElement} */
        this.console = document.getElementsByClassName('console')[0];
        
        this.config = new MatchConfig();
        
        this.init();
    }
    
    init() {
        this.config.showConfigurationPanel(this.container);
        this.addButtonsListeners();
    }
    
    addButtonsListeners() {
        const self = this;
        
        /** @type {HTMLDivElement} */
        const pausePlayBtn = this.container.getElementsByClassName('pause-play')[0];
        /** @type {HTMLDivElement} */
        const showNamesBtn = this.container.getElementsByClassName('showNames')[0];
        
        pausePlayBtn.addEventListener('click', (event) => {
            self.togglePlayPause();
            
            $(pausePlayBtn).toggleClass('is-playing');
        });
        showNamesBtn.addEventListener('click', (event) => {
            self.showNames();
            
            $(showNamesBtn).toggleClass('off');
        });
    }
    
    togglePlayPause() {
        return this.match.isPaused ? this.resumeMatch() : this.pauseMatch();
    }
    
    pauseMatch() {
        return this.match.pauseMatch();
    }
    
    resumeMatch() {
        return this.match.resumeMatch();
    }
    
    showNames() {
        return this.match.showNames();
    }
    
    /**
     * @param {ConsoleEvent} event
     */
    logConsoleEvent(event) {
        const tableRow = event.create();
        const consoleLinesContainer = this.console.getElementsByClassName('console-lines')[0];
        consoleLinesContainer.innerHTML += tableRow;
    }
}

export class ConsoleEvent {
    constructor(who, when, what) {
        this.who = who;
        this.when = when;
        this.what = what;
    }
    
    create() {
        return `<tr class="console-lines">
            <th class="console-event when"> ${this.when} </th>
            <th class="console-event who"> ${this.who} </th>
            <th class="console-event what"> ${this.what} </th>
        </tr>`;
    }
}
