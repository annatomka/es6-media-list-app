import { View } from '../../ui/view';

export class OptionsView extends View {
    template() {
        return `
            <div id="filterPanel">
                <div id="media-filter-panel">
                    <span>Sort by</span>
                    <select data-change="onSortByPropertySelectionChanged">
                        <option value="id">id</option>
                        <option value="title" selected>title</option>
                        <option value="viewers">viewers</option>
                    </select>
                    <span>Dir</span>
                    <select data-change="onSortByDirSelectionChanged">
                        <option value="1">asc</option>
                        <option value="-1">desc</option>
                    </select>
                    <span>Polling interval</span>
                    <input data-change="inputTest" value="1000"/>
                </div>


            </div>
        `;
    }
}
