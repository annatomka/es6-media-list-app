export function generateMediaItemTemplate(mediaItem) {
    return `
        <div>${mediaItem.title}</div>
        <div><strong>${mediaItem.viewers}</strong> viewers</div>
        <br/>
    `;
}
