import tmp from './tmp.hbs';

export default class SquadManager {
    constructor($workspace) {
        this.$workspace = $workspace.find('.content-container');
    }

    init() {
        this.$workspace.html(tmp);

        const $pitch = this.$workspace.find('.pitch');
        $pitch.gridstack({
            "minWidth": 320,
            "width": "12",
            "cellHeight": "10",
            "verticalMargin": 0,
            "animate": true,
            "float": true,
            "resizable": {
                "handles": "e, se, s, sw, w"
            }
        });
        const pitchGrid = $pitch.data('gridstack');

        this.$workspace.find('.add-player').click(() => {
            const playerHTML = `<div>
                                    <div class="grid-stack-item-content">
                                        <div class="player"></div>
                                    </div>
                                </div>`;
            pitchGrid.addWidget(playerHTML, 0, 0, 3, 2, true);
        });
    }
}
