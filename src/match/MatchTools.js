export default class MatchTools {
    constructor(match) {
        /** @type {HTMLDivElement} */
        this.container = document.getElementsByClassName('control-buttons')[0];

        /** @type {Match} */
        this.match = match;

        /** @type {HTMLDivElement} */
        this.console = document.getElementsByClassName('console')[0];

        this.init();
    }

    init() {
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
        let tableRow = event.create();

        $(this.console).find('.console-lines').append(tableRow);
    }
}

export class ConsoleEvent {
    constructor(who, when, what) {
        this.who = who;
        this.when = when;
        this.what = what;
    }

    create() {
        return `<tr className="console-lines">
            <th className="console-event when"> ${this.when} </th>
            <th className="console-event who"> ${this.who} </th>
            <th className="console-event what"> ${this.what} </th>
        </tr>`;
    }
}
