import { View } from '../../ui/view';
import { watchMediaItemTemplate } from '../watch.media.item.template';

export class WatchLaterListView extends View {
    template() {
        return `
            <div id="watchList">
                <h3 class="title"><i class="zmdi zmdi-time zmdi-hc-fw"></i> Watch List</h3>
                 ${this.list(this.component.watchListItems, watchMediaItemTemplate)}
            </div>
        `;
    }
}
