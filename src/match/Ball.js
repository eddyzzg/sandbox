import ballTemplate from './ball.hbs'

export default class Ball {
    
    constructor() {
        this.positionX=600;
        this.positionY=400;
    }
    
    render($field){
        let ball = ballTemplate(this);
        $field.append(ball);
    }
    
    move(){
    
    }
}
