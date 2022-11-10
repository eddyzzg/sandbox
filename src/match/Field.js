import fieldTmp from './field.hbs';

export default class Field {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.goalWidth = 40;
        this.goalHeight = 160;
        this.homeGoalX = 0;
        this.homeGoalY = (this.height / 2) - (this.goalHeight / 2);
        this.awayGoalX = this.width - this.goalWidth;
        this.awayGoalY = (this.height / 2) - (this.goalHeight / 2)
    }

    getDOMSelector() {
        return $('.field');
    }

    render() {
        const $body = $('body');
        const field = fieldTmp(this);
        $body.html(field);
    }
}
