import fieldTmp from './field.hbs';

export default class Field {
    
    constructor(width, height) {
        this.width = width;
        this.height = height;
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
