import testModule from './module-a';
import KlimaSandbox from './klima/sandbox'

const $WORKSPACE = $('body');

testModule.test();

$(document).ready(function () {
    const klimaSandbox = new KlimaSandbox($WORKSPACE);
    klimaSandbox.init();

    const text = 'witam i o wlosy pytam';
    klimaSandbox.showSomeTextInHTML(text);

    console.log('test');
    console.log('test');
});



