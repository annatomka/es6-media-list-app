import { config } from './config';
import { ApiService } from './api/api.service';

class App {
    constructor() {
        this.apiService = new ApiService(config, jQuery);
    }

    bootstrap() {
        this.ApiService.getAllMediaItems();
    }
}

const app = new App();
app.bootstrap();
