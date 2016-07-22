import { formatDate } from '../../framework/ui/format.date';
import { location } from './media.item.template';

export function watchMediaItemTemplate(mediaItem) {
    return `
        <div class="watch-media-item">
            <div class="media-header">
                <div class="media-picture-container">
                    <img src="${mediaItem.picture}"/>
                </div>
                <h4>${mediaItem.title}</h4>
                <div class="media-detail">
                    ${location(mediaItem)}
                    <span class="separator">•</span>
                    <span class="viewers"> <i class="zmdi zmdi-eye"></i><strong>${mediaItem.viewers}</strong> </span>
                    <span class="separator">•</span>
                    <span>added at <span>${formatDate(mediaItem.addedAt)}</span></span>
                    <span class="separator">•</span>
                    <span><small>#${mediaItem.id}</small></span>
                </div>
            </div>
            <button class="small danger pull-right m-t-5 m-b-10" data-click="removeItemFromWatchList" data-click-param="${mediaItem.id}">
                <i class="zmdi zmdi-minus"></i> Remove
            </button>
            <div class="clear"></div>
        </div>
    `;
}