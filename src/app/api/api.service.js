import { API_URL } from '../app.constants';

export class ApiService {
    constructor(jQuery) {
        this.jQuery = jQuery;
    }

    getAllMediaItems() {
        return this.jQuery.getJSON(`${API_URL}?callback=?`);
    }
}
