import tmp from './tmp.hbs';
import elementWrapper from './element_wrapper.hbs';

export default class SquadManager {
    constructor($workspace) {
        this.$workspace = $workspace.find('.content-container');
    }

    init() {
        this.$workspace.html(tmp);

        const $pitch = this.$workspace.find('.pitch');
        $pitch.gridstack({
            minWidth: 320,
            width: 12,
            cellHeight: 10,
            verticalMargin: 0,
            animate: true,
            float: true,
            resizable: {
                handles: ''
            }
        });
        const pitchGrid = $pitch.data('gridstack');

        this.$workspace.find('.add-player').click(() => {
            const playerHTML = elementWrapper({id: new Date().getTime()});
            pitchGrid.addWidget($(playerHTML), undefined, undefined, 2, 6, true);
        });
    }
}
