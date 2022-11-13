import fieldTmp from './field.hbs';

export default class Field {

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.goalWidth = 40;
        this.goalHeight = 90;

        this.homeGoalX = 0;
        this.homeGoalY = (this.height / 2) - (this.goalHeight / 2);
        this.awayGoalX = this.width;
        this.awayGoalY = (this.height / 2) - (this.goalHeight / 2);
    }

    getDOMSelector() {
        return $('.field');
    }

    render() {
        const $fieldContainer = $('body .field-container');
        const field = fieldTmp(this);
        $fieldContainer.html(field);
    }
}
