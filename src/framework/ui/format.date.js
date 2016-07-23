export function formatDate(dateToFormat) {
    const date = new Date(dateToFormat);
    const currDate = date.getDate();
    const currMonth = date.getMonth() + 1;
    const currYear = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${currYear}-${currMonth}-${currDate} ${hours}:${minutes}`;
}
