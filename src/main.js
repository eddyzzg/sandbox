import 'gridstack';
import testModule from './module-a';
import KlimaSandbox from './klima/sandbox'
import FaceGenerator from "./faces/FaceGenerator";
import WORKSPACE_TMP from './Workspace.hbs';
import './style.less';
import NamesGenerator from "./names/NamesGenerator";
import SquadManager from "./squad/SquadManager";
import Player from './match/Player';
import SquadGenerator from './squad/SquadGenerator';
import fieldDiv from './match/field.hbs';
import Field from './match/field.js';
import Event from './match/Event.js';

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
    let squadManager = openSquadManager($WORKSPACE.find('.squad-manager-container'));

    let homeTeam = new SquadGenerator();
    let awayTeam = new SquadGenerator();

    let homePayers = homeTeam.generateSquad();
    let awayPayers = awayTeam.generateSquad();

    generateHomePlayers(homePayers, awayPayers, squadManager);

    setTimeout(() => {
        let event = new Event(homePayers, awayPayers);
        event.compile()
    })
});

function generateHomePlayers(homeTeam, awayPayers, squadManager) {
    homeTeam.forEach((player) => {
        let renderHTML = player.getRenderHTML();
        squadManager.addOutsidePlayerToPitch(renderHTML);
    });

    awayPayers.forEach((player) => {
        let renderHTML = player.getRenderHTML();
        squadManager.addOutsidePlayerToPitch(renderHTML);
    });
}

/**
 * @return {jQuery}
 */
function createWorkspace() {
    const $body = $('body');
    $body.html(WORKSPACE_TMP());
    return $body;
}

/*
function generateSquad(team) {

    team = [];
    for (let i = 0; i < 15; i++) {
    team[i]= new Player(i,Alfons,Zwierzyński,CB,team)
    }

}
*/
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
    return squadManager;
}
