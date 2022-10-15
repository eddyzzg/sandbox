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


$(document).ready(function () {
    const $WORKSPACE = createWorkspace();

    $WORKSPACE.find('.menu .generator').click(() => {
        openFaceGenerator($WORKSPACE);
    });
    $WORKSPACE.find('.menu .squad-manager').click(() => {
        openSquadManager($WORKSPACE);
    });

    openFaceGenerator($WORKSPACE.find('.face-generator-container'));
    openSquadManager($WORKSPACE.find('.squad-manager-container'));
});

/**
 * @return {jQuery}
 */
function createWorkspace() {
    const $body = $('body');
    $body.html(WORKSPACE_TMP());
    return $body;
}

/**
 * @param {jQuery} $container
 */
function openFaceGenerator($container) {
    const klimaSandbox = new KlimaSandbox($container);
    klimaSandbox.init();

    const text = 'GENERATOR';
    klimaSandbox.showTextInHTML(text);
    klimaSandbox.showFace(FaceGenerator.generateFace());
    klimaSandbox.showName(NamesGenerator.generateName());
}

/**
 * @param {jQuery} $container
 */
function openSquadManager($container) {
    let squadManager = new SquadManager($container);
    squadManager.init();
}
