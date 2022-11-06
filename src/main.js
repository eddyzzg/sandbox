import 'gridstack';
import testModule from './module-a';
import WORKSPACE_TMP from './Workspace.hbs';
import './style.less';
import SquadManager from './squad/SquadManager';
import SquadGenerator from './squad/SquadGenerator';
import Event from './match/Event.js';
import playerHBS from './squad/player.hbs';
import Ball from './match/Ball';
import Field from './match/Field';

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
    
    let homeTeam = new SquadGenerator();
    let awayTeam = new SquadGenerator();
    
    let homePlayers = homeTeam.generateSquad("red");
    let awayPlayers = awayTeam.generateSquad("blue");
    
    let squadManager = openSquadManager($WORKSPACE.find('.squad-manager-home-container'), homeTeam);
    let squadManager2 = openSquadManager($WORKSPACE.find('.squad-manager-away-container'), awayTeam);
    
    generatePlayers(homePlayers, squadManager);
    generatePlayers(awayPlayers, squadManager2);
    
    $WORKSPACE.find('.start-match').click(() => {
        startMatch(homePlayers, awayPlayers);
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

/**
 * @param {jQuery} $container
 */
function openSquadManager($container, team) {
    let squadManager = new SquadManager($container, team);
    squadManager.init();
    return squadManager;
}

function placeForwardPlayerToTheMiddleOfTheField(homePlayers) {
    let index = 0
    if (index === 0) {
        const forwardPlayer = homePlayers[10];
        forwardPlayer.hasBall = true;
        forwardPlayer.positionX = 600;
        forwardPlayer.positionY = 400;
        forwardPlayer.reRender();
    }
}

function renderBall($field) {
    new Ball().render($field);
}

/**
 * @param {Player[]} homePlayers
 * @param {Player[]} awayPlayers
 */
function startMatch(homePlayers, awayPlayers) {
    const $field = new Field(1200, 800).render();
    
    addPlayersToMatch(homePlayers, awayPlayers, $field);
    renderBall($field);
    placeForwardPlayerToTheMiddleOfTheField(homePlayers);
    
    setInterval(() => {
        const event = new Event(homePlayers, awayPlayers, $field);
        event.compile();
    }, 1000);
    
}

function addPlayersToMatch(homePlayers, awayPlayers, $field) {
    homePlayers.forEach((player) => {
        $field.append(playerHBS({
            id: player.id,
            name: player.name,
            position: player.position,
            positionX: player.positionX - 25,
            positionY: player.positionY,
            team: player.team,
        }));
        player.positionX = player.positionX - 25;
    })
    awayPlayers.forEach((player) => {
        $field.append(playerHBS({
            id: player.id,
            name: player.name,
            position: player.position,
            positionX: 600 - player.positionX + 525,
            positionY: player.positionY,
            team: player.team,
        }));
        player.positionX = 600 - player.positionX + 525;
    })
}
