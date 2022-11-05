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
import Field from './match/field.hbs';
import Event from './match/Event.js';
import PlayerHBS from './squad/player.hbs';

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

//    openFaceGenerator($WORKSPACE.find('.face-generator-container'));
    let homeTeam = new SquadGenerator();
    let awayTeam = new SquadGenerator();

    let homePlayers = homeTeam.generateSquad("red");
    let awayPlayers = awayTeam.generateSquad("blue");

    let squadManager = openSquadManager($WORKSPACE.find('.squad-manager-home-container'), homeTeam);
    let squadManager2 = openSquadManager($WORKSPACE.find('.squad-manager-away-container'), awayTeam);

    generatePlayers(homePlayers, squadManager);
    generatePlayers(awayPlayers, squadManager2);


    $WORKSPACE.find('.start-match').click(() => {
        let field = Field;
        startMatch(homePlayers, awayPlayers, field);
    });


});

function generatePlayers(team, squadManager) {
    team.forEach((player) => {
        let renderHTML = player.getRenderHTML();
        squadManager.addOutsidePlayerToPitch(player, renderHTML);
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

/*
function openFaceGenerator($container) {
    const klimaSandbox = new KlimaSandbox($container);
    klimaSandbox.init();

    const text = 'GENERATOR';
    klimaSandbox.showTextInHTML(text);
    klimaSandbox.showFace(FaceGenerator.generateFace());
    klimaSandbox.showName(NamesGenerator.generateName());
}
*/
/**
 * @param {jQuery} $container
 */
function openSquadManager($container, team) {
    let squadManager = new SquadManager($container, team);
    squadManager.init();
    return squadManager;
}


function startMatch(homePlayers, awayPlayers, field) {
    const $body = $('body');
    $body.html(field({width: 1200, height: 800}));
    const playerhbs = PlayerHBS;
    const $field = $('.field');

    for (let i = 0; i < 11; i++) {
        $field.append(playerhbs({
            id: homePlayers[i].id,
            name: homePlayers[i].name,
            position: homePlayers[i].position,
            positionX: homePlayers[i].positionX - 25,
            positionY: homePlayers[i].positionY,
            team: homePlayers[i].team,
        }));

    }
    for (let i = 0; i < 11; i++) {
        $field.append(playerhbs({
            id: awayPlayers[i].id,
            name: awayPlayers[i].name,
            position: awayPlayers[i].position,
            positionX: 600 - awayPlayers[i].positionX + 525,
            positionY: awayPlayers[i].positionY,
            team: awayPlayers[i].team,
        }));
    }


    const event = new Event(homePlayers, awayPlayers);
    setInterval(() => {
        event.compile();
    }, 1000);

}