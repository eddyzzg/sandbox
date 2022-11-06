import ballTemplate from './ball.hbs'

export default class Ball {

    constructor() {
        this.positionX = 550;
        this.positionY = 355;
    }

    render($field) {
        let ball = ballTemplate(this);
        $field.append(ball);
    }

    reRender() {
        let ball = ballTemplate(this);
        $("#ball").html(ball);
    }


    move(x, y) {
        this.positionX = x;
        this.positionY = y;
    }
}
