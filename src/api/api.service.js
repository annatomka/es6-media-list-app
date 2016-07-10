import { API_URL } from '../app.constants';

export class ApiService {
    constructor(jQuery) {
        this.apiUrl = API_URL;
        this.jQuery = jQuery;
    }

    getAllMediaItems() {
        return jQuery.getJSON(`${this.apiUrl}?callback=?`, (result) => result);
    }
}
