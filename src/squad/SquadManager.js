import tmp from './tmp.hbs';
import elementWrapper from './element_wrapper.hbs';
import NamesGenerator from "../names/NamesGenerator";

export default class SquadManager {

    constructor($workspace) {
        /** @type {jQuery} */
        this.$workspace = $workspace;

        /** @type {Object} */
        this.gridOptions = {
            minWidth: 320,
            width: 12,
            cellHeight: 10,
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

        this.$workspace.find('.add-player').click(() => {
            self.addPlayerToPitch();

            const $faceGenContainer = getFaceGeneratorContainer(self.$workspace);
            $faceGenContainer.find('#nameGen').click();
            $faceGenContainer.find('#faceGen').click();
        });

        $pitch.on('added', (event, items) => {
        });

        $pitch.on('dragstop', (event, item) => {
            if (item.position.left < 0 || item.position.top > 600) {
                self.pitchGrid.update(item.helper, 0, 0, 3, 6);

            }
            self.setPosition(item.helper, item.position);
        });
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

        if (positionOnGrid.left > 600) {
            $playerPosition.addClass('forward');

            if (positionOnGrid.top > 0 && positionOnGrid.top < 125) {
                position = 'LF';
            } else if (positionOnGrid.top > 125 && positionOnGrid.top < 375) {
                position = 'F';
            } else if (positionOnGrid.top > 375) {
                position = 'RF';
            }

        } else if (positionOnGrid.left > 300 && positionOnGrid.left < 600) {
            $playerPosition.addClass('midfielder');

            if (positionOnGrid.top > 0 && positionOnGrid.top < 125) {
                position = 'LM';
            } else if (positionOnGrid.top > 125 && positionOnGrid.top < 375) {
                position = 'CM';
            } else if (positionOnGrid.top > 375) {
                position = 'RM';
            }

        } else if (positionOnGrid.left > 50 && positionOnGrid.left < 300) {
            $playerPosition.addClass('defender');

            if (positionOnGrid.top > 0 && positionOnGrid.top < 125) {
                position = 'LD';
            } else if (positionOnGrid.top > 125 && positionOnGrid.top < 375) {
                position = 'CD';
            } else if (positionOnGrid.top > 375) {
                position = 'RD';
            }

        } else if (positionOnGrid.left >= 0 && positionOnGrid.left < 50) {
            $playerPosition.addClass('goal-keeper');
            position = 'GK';
        }

        $playerPosition.html(position);
    }

    addPlayerToPitch() {
        const generatedName = getFaceGeneratorContainer(this.$workspace).find('.name-container').html();
        const playerHTML = this.createPlayer(generatedName);
        this.pitchGrid.addWidget(playerHTML, 0, 0, 3, 6, true);
    }

    /**
     * @param name {String}
     * @return {String}
     */
    createPlayer(name = NamesGenerator.generateName()) {
        return elementWrapper({id: new Date().getTime(), name, position: 'RES'});
    }
}

/**
 * @param {jQuery} $workspace
 * @return {*|jQuery}
 */
function getFaceGeneratorContainer($workspace) {
    return $workspace.closest('.content-container').find('.face-generator-container');
}
