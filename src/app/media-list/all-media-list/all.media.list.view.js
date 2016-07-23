import { View } from '../../../framework/ui/view';
import { list } from '../../../framework/ui/view.helpers';
import { mediaItemTemplate } from '../media.item.template';

export class AllMediaListView extends View {
    template() {
        return `
            <div id="allMedia">
                <h3 class="title primary">
                    <i class="zmdi zmdi-play-circle zmdi-hc-fw"></i> Available Media
                </h3>
                <div id="optionsPanelContainer"></div>
                ${list(this.component.items, mediaItemTemplate)}
            </div>
        `;
    }
}
