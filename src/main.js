import 'gridstack';
import testModule from './module-a';
import WORKSPACE_TMP from './Workspace.hbs';
import './style.less';
import SquadManager from './squad/SquadManager';
import Team from './squad/Team';
import KlimaSandbox from './klima/sandbox';
import FaceGenerator from './faces/FaceGenerator';
import NamesGenerator from './names/NamesGenerator';
import Match from './match/Match';

testModule.test();
global.API = {};


$(document).ready(function () {
    const $workspace = createWorkspace();
    
    $workspace.find('.menu .generator').click(() => {
        openFaceGenerator($workspace);
    });
    $workspace.find('.menu .squad-manager').click(() => {
        openSquadManager($workspace);
    });
    let $startMatchBtn = $workspace.find('.start-match');
    $startMatchBtn.click(() => {
        homeTeam.generateSquad();
        awayTeam.generateSquad();
        
        return startMatch(homeTeam, awayTeam);
    });
    
    let homeTeam = new Team();
    let awayTeam = new Team(true);
    
    let squadManager = openSquadManager($workspace.find('.squad-manager-home-container'), homeTeam);
    let squadManager2 = openSquadManager($workspace.find('.squad-manager-away-container'), awayTeam);
    
    // generatePlayers(homePlayers, squadManager);
    // generatePlayers(awayPlayers, squadManager2);
    
    //instant start match
    $startMatchBtn.click();
});

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
 */
function startMatch(homeTeam, awayTeam) {
    const match = new Match(homeTeam, awayTeam);
    return match.prepare().then(() => {
        return match.start();
    });
}
