export function formatDate(dateToFormat){
    "use strict";
    let d = new Date(dateToFormat);
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1; //Months are zero based
    let curr_year = d.getFullYear();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    console.log(curr_date + "-" + curr_month + "-" + curr_year);
    return `${curr_year}-${curr_month}-${curr_date} ${hours}:${minutes}`;
}