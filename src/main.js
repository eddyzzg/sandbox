import 'gridstack';
import WORKSPACE_TMP from './Workspace.hbs';
import './style.less';
import SquadManager from './squad/SquadManager';
import Team from './squad/Team';
import KlimaSandbox from './klima/sandbox';
import FaceGenerator from './faces/FaceGenerator';
import NamesGenerator from './names/NamesGenerator';
import Match from './match/Match';
import matchWindow from './matchWindow.hbs';
import {eventBus, events} from './lifecycle/EventBus';
import PlayerDecisionEvent from "./match/PlayerDecisionEvent";
import Player from "./match/Player";

global.API = {};

$(document).ready(function () {
    /*
    const $workspace = createWorkspace();
    $workspace.find('.menu .generator').click(() => {
        openFaceGenerator($workspace);
    });
    $workspace.find('.menu .squad-manager').click(() => {
        openSquadManager($workspace);
    });

    let $startMatchBtn = $("body").find('.start-match');
    $startMatchBtn.click(() => {

    });
    
    let squadManager = openSquadManager($workspace.find('.squad-manager-home-container'), homeTeam);
    let squadManager2 = openSquadManager($workspace.find('.squad-manager-away-container'), awayTeam);
    
    // generatePlayers(homePlayers, squadManager);
    // generatePlayers(awayPlayers, squadManager2);
    
    //instant start match
    //$startMatchBtn.click();
    */
    
    const $workspace = createWorkspace();
    prepareApplication();
    
    let homeTeam = new Team();
    let awayTeam = new Team(true);
    homeTeam.generateSquad();
    awayTeam.generateSquad();
    
    return startMatch(homeTeam, awayTeam, $workspace);
});

function prepareApplication() {
    API.eventBus = eventBus;
    API.events = events;
}

function generatePlayers(team, squadManager) {
    team.forEach((player) => {
        let tmp = player.getTemplate();
        squadManager.addOutsidePlayerToPitch(player, tmp(player));
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

/**
 * @param {Team} homeTeam
 * @param {Team} awayTeam
 * @param {jQuery} $workspace
 */
function startMatch(homeTeam, awayTeam, $workspace) {
    $workspace.find('.match-container').html(matchWindow());
    
    tests(homeTeam, awayTeam);
    
    const match = new Match(homeTeam, awayTeam);
    return match.prepare().then(() => {
        return match.start();
    });
}

function tests(homeTeam, awayTeam) {
    let playerDef = homeTeam.squad.get(1);
    const player = new Player(playerDef, homeTeam);
    let playerDecisionEvent = new PlayerDecisionEvent(player);
    playerDecisionEvent.validator();
}
