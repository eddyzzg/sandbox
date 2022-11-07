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
import KlimaSandbox from './klima/sandbox';
import FaceGenerator from './faces/FaceGenerator';
import NamesGenerator from './names/NamesGenerator';

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
    
    let homePlayers = homeTeam.generateSquad('red');
    let awayPlayers = awayTeam.generateSquad('blue');
    
    let squadManager = openSquadManager($WORKSPACE.find('.squad-manager-home-container'), homeTeam);
    let squadManager2 = openSquadManager($WORKSPACE.find('.squad-manager-away-container'), awayTeam);
    
    generatePlayers(homePlayers, squadManager);
    generatePlayers(awayPlayers, squadManager2);
    
    const $startMatchBtn = $WORKSPACE.find('.start-match');
    $startMatchBtn.click(() => {
        startMatch(homePlayers, awayPlayers);
    });
    
    $startMatchBtn.click();
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

function placeForwardPlayerToTheMiddleOfTheField(homePlayers, ball) {
    const forwardPlayer = homePlayers[10];
    forwardPlayer.hasBall = true;
    forwardPlayer.positionX = 550;
    forwardPlayer.positionY = 355;
    forwardPlayer.reRender();
}

function renderBall($field) {
    let ball = new Ball();
    ball.render($field);
    return ball
}

/**
 * @param {Player[]} homePlayers
 * @param {Player[]} awayPlayers
 */
function startMatch(homePlayers, awayPlayers) {
    const $field = new Field(1200, 800).render();
    
    addPlayersToMatch(homePlayers, awayPlayers, $field);
    let ball = renderBall($field);
    
    const event = new Event(homePlayers, awayPlayers, $field, ball);
    placeForwardPlayerToTheMiddleOfTheField(homePlayers, ball);
    
    // event.passEvent();
    
    setInterval(() => {
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
