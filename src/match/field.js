import fieldTmp from './field.hbs';

export default class Field {

    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    init() {
        let wspolrzedne = [];
    }
    
    render() {
        let field = fieldTmp(this);
        let $body = $(document).find('body');
        
        $body.html(field);
    }
}
