import 'gridstack';

import testModule from './module-a';
import KlimaSandbox from './klima/sandbox'
import FaceGenerator from "./faces/FaceGenerator";
import WORKSPACE_TMP from './Workspace.hbs';

import './style.less';
import NamesGenerator from "./names/NamesGenerator";
import SquadManager from "./squad/SquadManager";

testModule.test();

global.API = {};

function createWorkspace() {
    return $('body').html(WORKSPACE_TMP());
}

$(document).ready(function () {
    createWorkspace();
    const $WORKSPACE = $('body');

    $WORKSPACE.find('.menu .generator').click(() => {
        const klimaSandbox = new KlimaSandbox($WORKSPACE);
        klimaSandbox.init();

        const text = 'GENERATOR';
        klimaSandbox.showTextInHTML(text);
        klimaSandbox.showFace(FaceGenerator.generateFace());
        klimaSandbox.showName(NamesGenerator.generateName());
    });
    $WORKSPACE.find('.menu .squad-manager').click(() => {
        let squadManager = new SquadManager($WORKSPACE);
        squadManager.init();
    });


});



