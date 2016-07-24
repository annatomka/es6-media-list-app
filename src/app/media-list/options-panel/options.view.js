import { View } from '../../../framework/ui/view';

export class OptionsView extends View {
    template() {
        return `
            <div id="filterPanel">
                <div id="media-filter-panel" class="m-b-10">
                    <div class="pull-left media-filters">
                        <span><i class="zmdi zmdi-sort-amount-asc"></i> </span>
                        <select data-change="onSortByPropertySelectionChanged" class="m-r-5">
                            <option value="id">id</option>
                            <option value="title" selected>title</option>
                            <option value="viewers">viewers</option>
                            <option value="description">description</option>
                        </select>
                        <span><i class="zmdi zmdi-sort-asc"></i> </span>
                        <select data-change="onSortByDirSelectionChanged" class="m-r-5">
                            <option value="1">asc</option>
                            <option value="-1">desc</option>
                        </select>
                        <span><i class="zmdi zmdi-filter-list"></i> </span>
                        <select data-change="onFilterSelectionChanged" class="m-r-5">
                            <option value="*">All</option>
                            <option value="live">Live channel only</option>
                            <option value="offline">Offline channel only</option>
                            <option value="video">Video only</option>
                        </select>
                    </div>
                    <div class="pull-right polling-interval">
                        <i class="zmdi zmdi-time-restore"></i>
                        <span>5s</span>
                        <input type="range" value="10" min="5" max="100" step="1"
                            data-change="onPollingInputChanged"/>
                        <span>100s</span>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        `;
    }
}
