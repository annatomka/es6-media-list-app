export function formatDate(dateToFormat) {
    "use strict";
    let date = new Date(dateToFormat);
    let curr_date = date.getDate();
    let curr_month = date.getMonth() + 1;
    let curr_year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return `${curr_year}-${curr_month}-${curr_date} ${hours}:${minutes}`;
}