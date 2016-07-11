import { View } from '../../ui/view';
import { generateMediaItemTemplate } from './media.item.template';

export class AllMediaListView extends View {
    template() {
        return `
            <div>
                All media<br/>
                ${this.generateMediaList()}
            </div>
        `;
    }

    generateMediaList() {
        if (this.viewModel.items) {
            const result = this.viewModel.items.map((item) => {
                return generateMediaItemTemplate(item);
            });
            return result.join('');
        }
        return '';
    }
}
