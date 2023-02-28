import 'gridstack';
import WORKSPACE_TMP from './Workspace.hbs';
import './style.less';
import SquadManager from './squad/SquadManager';
import Team from './squad/Team';
import KlimaSandbox from './klima/sandbox';
import Match from './match/Match';
import matchWindow from './matchWindow.hbs';
import {eventBus, events} from './lifecycle/EventBus';
import PlayerDecisionEvent from './match/players/PlayerDecisionEvent';
import Player from './match/players/Player';

const configNotInitError = 'GLOBAL CONFIG NOT INIT !';

global.API = {};
global.API.getGlobalParam = (name) => {
    if (API.match && API.match.tools && API.match.tools.config) {
        return API.match.tools.config.getParam(name);
    }
    return configNotInitError;
}
global.API.setGlobalParam = (name, value) => {
    if (API.match && API.match.tools && API.match.tools.config) {
        return API.match.tools.config.setParam(name, value);
    }
    return configNotInitError;
}

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
    
    if (true) {
        const $workspace = createWorkspace();
        prepareApplication();
        
        let homeTeam = new Team();
        let awayTeam = new Team(true);
        homeTeam.generateSquad();
        awayTeam.generateSquad();
        
        return startMatch(homeTeam, awayTeam, $workspace);
    } else {
        animationTest();
    }
});

function animation() {
    return new Promise((resolve) => {
        const obj = document.getElementById('obj-id');
        if (obj.style.top === '100px') {
            obj.style.top = '0';
        } else {
            obj.style.top = '100px';
        }
        
        window.animListener = () => {
            obj.removeEventListener('transitionend', window.animListener)
            resolve();
        }
        obj.addEventListener('transitionend', window.animListener);
    });
}

function animationTest() {
    return animation().then(() => {
        return animation().then(() => {
            return animation();
        });
    });
}

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
    // klimaSandbox.showTextInHTML(text);
    // klimaSandbox.showFace(FaceGenerator.generateFace());
    // klimaSandbox.showName(NamesGenerator.generateName());
}

/**
 * @param {Team} homeTeam
 * @param {Team} awayTeam
 * @param {jQuery} $workspace
 */
function startMatch(homeTeam, awayTeam, $workspace) {
    $workspace.find('.match-container').html(matchWindow());
    
    // trySomeMovesOnCanvas();
    
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
    // playerDecisionEvent.validator();
}

function trySomeMovesOnCanvas() {
    let canvas = document.getElementById('field_canvas');
    let canvas1 = document.getElementById('player_canvas');
    canvas.classList.remove('hidden');
    canvas1.classList.remove('hidden');
    
    let ctx = canvas.getContext('2d');
    
    canvas.width = 1200;
    canvas.height = 700;
    
    ctx.fillStyle = 'black';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'black';
    
    const field = new FieldGUI(canvas);
    const players = field.players;
    
    //move left
    // const promises = []
    // players.forEach((player) => {
    //     let moveToDestination = randomIntFromInterval(0, 1200);
    //     let playerMove = player.moveTo(moveToDestination, 0);
    //     promises.push(playerMove);
    // });
    // Promise.all(promises);
    
    players[0].moveTo(randomIntFromInterval(0, 1200), 0).then(() => {
        players[1].moveTo(randomIntFromInterval(0, 1200), 0)
    });
    
    function animate() {
        if (!field.stop) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            field.render(ctx);
        }
        window.requestAnimationFrame(animate);
    }
    animate();
}

class FieldGUI {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.players = this.createPlayers();
        this.stop = false;
    }
    
    createPlayers() {
        const players = [];
        for (let i=0; i<2; i++) {
            players.push(new PlayerGUI(i, this, 0, i * 70));
        }
        return players;
    }
    
    render(context) {
        this.players.forEach((player) => {
            player.draw(context);
            player.update();
        });
    }
    
    animateMove() {
        this.stop = false;
    }
    
    stopAnimationMove() {
        let allObjectAnimationDone = true;
        this.players.forEach((player) => {
            if (player.moveXDone !== true || player.moveYDone !== true) {
                allObjectAnimationDone = false;
            }
        });
        
        if (allObjectAnimationDone) {
            this.stop = true;
        }
    }
}

class PlayerGUI {
    constructor(id, field, startX, startY) {
        this.id = id;
        this.field = field;
        this.currentX = startX;
        this.currentY = startY;
        this.collisionRadius = 30;
        this.speed = 10;
        
        this.moveXDone = false;
        this.moveYDone = false;
        
        this.directionX = undefined;
        this.directionY = undefined;
    }
    draw(context) {
        context.beginPath()
        context.arc(this.currentX, this.currentY, this.collisionRadius,0, Math.PI * 2);
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
    }
    
    update() {
        if (this.directionX === 'right') {
            if (this.currentX <= this.borderX) {
                this.currentX += this.speed;
            } else {
                this.moveXDone = true;
            }
        } else if (this.directionX === 'left') {
            if (this.currentX >= this.borderX) {
                this.currentX -= this.speed;
            } else {
                this.moveXDone = true;
            }
        } else {
            this.moveXDone = true;
        }
    
        if (this.directionY === 'top') {
            if (this.currentY >= this.borderY) {
                this.currentY -= this.speed;
            } else {
                this.moveYDone = true;
            }
        } else if (this.directionY === 'bottom') {
            if (this.currentY <= this.borderY) {
                this.currentY += this.speed;
            } else {
                this.moveYDone = true;
            }
        } else {
            this.moveYDone = true;
        }
        
        if (this.moveXDone && this.moveYDone) {
            this.field.stopAnimationMove();
            
            if (this.emitDone) {
                this.emitDone();
            }
        }
    }
    
    moveTo(x, y) {
        return new Promise((resolve) => {
            this.moveXDone = false;
            this.moveYDone = false;
            
            if (x !== 0) {
                this.directionX = this.currentX < x ? 'right' : 'left';
            } else {
                this.directionX = undefined;
            }
            if (y !== 0) {
                this.directionY = this.currentY < y ? 'top' : 'bottom';
            } else {
                this.directionY = undefined;
            }
    
            this.emitDone = resolve;
            this.field.animateMove();
    
            this.borderX = this.currentX + x;
            this.borderY = this.currentY + y;
            
            console.log('this.borderX')
            console.log(this.borderX)
        });
    }
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}
