import testModule from './module-a';
import KlimaSandbox from './klima/sandbox'
import FaceGenerator from "./faces/FaceGenerator";

import './style.less';

testModule.test();

$(document).ready(function () {
    const $WORKSPACE = $('body');
    const klimaSandbox = new KlimaSandbox($WORKSPACE);
    klimaSandbox.init();

    const text = 'witam i o wlosy pytam';
    klimaSandbox.showTextInHTML(text);

    klimaSandbox.showAvatar(FaceGenerator.generateFace());

    console.log('asfasf');
});



