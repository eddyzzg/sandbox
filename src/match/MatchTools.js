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
        const pauseBtn = this.container.getElementsByClassName('pause')[0];
        /** @type {HTMLDivElement} */
        const playBtn = this.container.getElementsByClassName('play')[0];
        /** @type {HTMLDivElement} */
        const showNamesBtn = this.container.getElementsByClassName('showNames')[0];

        pauseBtn.addEventListener('click', (event) => {
            self.pauseMatch();
        });
        playBtn.addEventListener('click', (event) => {
            self.resumeMatch();
        });
        showNamesBtn.addEventListener('click', (event) => {
            self.showNames();
        });
    }

    pauseMatch() {
        this.match.pauseMatch();
    }

    resumeMatch() {
        this.match.resumeMatch();
    }

    showNames() {
        this.match.showNames();
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
