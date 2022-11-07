import ballTemplate from './ball.hbs'

export default class Ball {
    
    constructor() {
        this.positionX = 550;
        this.positionY = 355;
    }
    
    getJQueryObject() {
        return $('#ball .ball');
    }
    
    render($field) {
        $field.append(ballTemplate(this));
    }
    
    // reRender() {
    //     this.getJQueryObject().html(ballTemplate(this));
    // }
    
    move(x, y, isInstantMove) {
        this.positionX = x;
        this.positionY = y;
        
        const $element = this.getJQueryObject();
        if (isInstantMove) {
            $element.css('left', `${this.positionX}px`);
            $element.css('top', `${this.positionY}px`);
        } else {
            // $element.css('left', `${this.positionX}px`);
            // $element.css('top', `${this.positionY}px`);
            
            $element.animate({
                left: `${this.positionX}px`,
                top: `${this.positionY}px`,
            }, 400, () => {
                console.log('animation complete !');
            });
        }
    }
}
