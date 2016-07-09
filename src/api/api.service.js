export class ApiService {
    constructor(config, jQuery) {
        this.apiUrl = config.apiUrl;
        this.jQuery = jQuery;
    }

    getAllMediaItems() {
        return this.jQuery.getJSON(`${this.apiUrl}?callback=?`, (result) => result);
    }
}
