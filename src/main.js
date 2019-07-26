import testModule from './module-a';
import KlimaSandbox from './klima/sandbox'
import FaceGenerator from "./faces/FaceGenerator";
import WORKSPACE_TMP from './Workspace.hbs';

import './style.less';
import NamesGenerator from "./names/NamesGenerator";

testModule.test();

global.API = {};

function createWorkspace() {
    return $('body').html(WORKSPACE_TMP());
}

$(document).ready(function () {
    createWorkspace();
    const $WORKSPACE = $('body');

    const klimaSandbox = new KlimaSandbox($WORKSPACE);
    klimaSandbox.init();

    const text = 'GENERATOR';
    klimaSandbox.showTextInHTML(text);
    klimaSandbox.showFace(FaceGenerator.generateFace());
    klimaSandbox.showName(NamesGenerator.generateName());
});



