import testModule from './module-a';
import KlimaSandbox from './klima/sandbox'
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-male-sprites';

import './style.less';

let options = {};
let avatars = new Avatars(sprites(options));
let svg = avatars.create('custom-seed');

testModule.test();

$(document).ready(function () {
    const $WORKSPACE = $('body');
    const klimaSandbox = new KlimaSandbox($WORKSPACE);
    klimaSandbox.init();

    const text = 'witam i o wlosy pytam';
    klimaSandbox.showTextInHTML(text);

    klimaSandbox.showAvatar(svg);

    console.log('asfasf');
});



