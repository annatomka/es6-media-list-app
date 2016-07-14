import { list } from '../ui/view.helpers';

export function mediaItemTemplate(mediaItem) {
    return `
    <div class="media-item">
        <div class="media-header">
            <div class="media-picture-container">
                <img src="${mediaItem.picture}"/>
            </div>
            <h4>${mediaItem.title} ${liveBadge()}</h4>
            <div class="media-detail">
                <span class="location">from ${mediaItem.location && mediaItem.location.city}, ${mediaItem.location && mediaItem.location.country}</span>
                <span class="separator">•</span>
                <span class="viewers"> <i class="zmdi zmdi-eye"></i> <strong>${mediaItem.viewers}</strong></span>
                <span class="separator">•</span>
                <span><small>#${mediaItem.id}</small></span>
            </div>
        </div>

        <p>${mediaItem.description}</p>
        <p>${list(mediaItem.labels, badge)}</p>
        <button class="pull-right" data-click="addToWatchLaterList" data-click-param="${mediaItem.id}">
           <i class="zmdi zmdi-time"></i> Watch later
        </button>

        <div class="clear"></div>
    </div>
    `;

    function liveBadge() {
        return mediaItem.isLive ? `<span class="badge live">live</span>` : '';
    }

    function badge(label) {
        return `<span class="badge m-r-5">${label}</span>`
    }
}
