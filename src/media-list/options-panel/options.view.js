import { View } from '../../ui/view';

export class OptionsView extends View {
    template() {
        return `
            <div id="filterPanel">
                <div id="media-filter-panel" class="m-b-10">
                    <span><i class="zmdi zmdi-sort-amount-asc"></i> </span>
                    <select data-change="onSortByPropertySelectionChanged" class="m-r-5">
                        <option value="id">id</option>
                        <option value="title" selected>title</option>
                        <option value="viewers">viewers</option>
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
                    <span><i class="zmdi zmdi-time-restore"></i> </span>
                    <input data-change="onPollingInputChanged" value="10"/>
                </div>


            </div>
        `;
    }
}
