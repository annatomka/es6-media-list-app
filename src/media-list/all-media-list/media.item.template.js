export function generateMediaItemTemplate(mediaItem) {
    return `
        <div>${mediaItem.title}</div>
        <a data-click="addToWatchLaterList"><em>Watch later</em></a>
        <div><strong>${mediaItem.viewers}</strong> viewers</div>
        <br/>
    `;
}
