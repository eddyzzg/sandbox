import tmp from './tmp.hbs';
import elementWrapper from './element_wrapper.hbs';
import NamesGenerator from "../names/NamesGenerator";

export default class SquadManager {

    constructor($workspace, team) {
        /** @type {jQuery} */
        this.$workspace = $workspace;
        this.team = team;
        //  console.log(team.player[0]);

        /** @type {Object} */
        this.gridOptions = {
            //     minWidth: 320,
            width: 12,
            height: 9,
            cellHeight: 88,
            cellWidth: 88,
            verticalMargin: 0,
            animate: true,
            float: true,
            disableResize: true,
            resizable: {
                handles: ''
            }
        };

        /** @type {GridStackUI} */
        this.pitchGrid = undefined;
    }

    /**
     * @param {GridStackUI} grid
     */
    setPitchGrid(grid) {
        this.pitchGrid = grid;
    }

    init() {
        const self = this;
        this.$workspace.html(tmp);

        const $pitch = this.$workspace.find('.pitch');

        $pitch.gridstack(this.gridOptions);
        this.setPitchGrid($pitch.data('gridstack'));

        $pitch.on('added', (event, items) => {
        });

        $pitch.on('dragstop', (event, item) => {
            if (item.position.left < 0 || item.position.top > 800) {
                self.pitchGrid.update(item.helper, 0, 0, 1, 1);

            }
            self.setPosition(item.helper, item.position);

        });
    }

    handleAdd(self) {
        //   self.addPlayerToPitch();

        //       const $faceGenContainer = getFaceGeneratorContainer(self.$workspace);
        //       $faceGenContainer.find('#nameGen').click();
        //      $faceGenContainer.find('#faceGen').click();
    }

    /**
     * @param {jQuery} $player
     * @param {Object} positionOnGrid
     */
    setPosition($player, positionOnGrid) {
        const $playerPosition = $player.find('.position');
        let position;

        //remove all clesses expect 'postion'
        $playerPosition.attr('class', 'position');

        if (positionOnGrid.left > 800) {
            $playerPosition.addClass('forward');

            if (positionOnGrid.top > 0 && positionOnGrid.top < 266) {
                position = 'LF';
            } else if (positionOnGrid.top > 266 && positionOnGrid.top < 532) {
                position = 'F';
            } else if (positionOnGrid.top > 532) {
                position = 'RF';
            }

        } else if (positionOnGrid.left >= 400 && positionOnGrid.left <= 800) {
            $playerPosition.addClass('midfielder');

            if (positionOnGrid.top > 0 && positionOnGrid.top < 266) {
                position = 'LM';
            } else if (positionOnGrid.top > 266 && positionOnGrid.top < 532) {
                position = 'CM';
            } else if (positionOnGrid.top > 532) {
                position = 'RM';
            }

        } else if (positionOnGrid.left > 50 && positionOnGrid.left < 400) {
            $playerPosition.addClass('defender');

            if (positionOnGrid.top > 0 && positionOnGrid.top < 266) {
                position = 'LD';
            } else if (positionOnGrid.top > 266 && positionOnGrid.top < 532) {
                position = 'CD';
            } else if (positionOnGrid.top > 532) {
                position = 'RD';
            }

        } else if (positionOnGrid.left >= 0 && positionOnGrid.left < 50) {
            $playerPosition.addClass('goal-keeper');
            position = 'GK';
        }


        let id = ($player.find('.id').text());
        this.team.squad[id].position = position;
        this.team.squad[id].positionX = Math.ceil(positionOnGrid.left / 2) + 50;
        this.team.squad[id].positionY = positionOnGrid.top;
        this.team.squad[id].nominalPositionX = positionOnGrid.left;
        this.team.squad[id].nominalPositionY = positionOnGrid.top;
        $playerPosition.html(position);


    }

    /*
        addPlayerToPitch() {
            const generatedName = getFaceGeneratorContainer(this.$workspace).find('.name-container').html();
            const playerHTML = this.createPlayer(generatedName);
            this.pitchGrid.addWidget(playerHTML, 0, 0, 1, 1, true);
        }
*/
    addOutsidePlayerToPitch(player, playerHTML) {
        this.pitchGrid.addWidget(playerHTML, 0, 0, 1, 1, true);
    }

    /**
     * @param name {String}
     * @return {String}
     */

    /*
        createPlayer(name = NamesGenerator.generateName()) {


            return elementWrapper({id: new Date().getTime(), name, position: 'RES', shirtColor: "gray"});
        }*/
}

/**
 * @param {jQuery} $workspace
 * @return {*|jQuery}
 */

/*
function getFaceGeneratorContainer($workspace) {
    return $workspace.closest('.content-container').find('.face-generator-container');
}
*/