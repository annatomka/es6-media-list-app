import { App } from './app';

describe('App', () => {
    let app = new App(jQuery);

    describe('constructor', ()=>{
        it('should create Api Service', ()=>{
            expect(app.apiService).toBeDefined();
        });

        it('should create Event Emitter', ()=>{
            expect(app.eventEmitter).toBeDefined();
        });

        it('should create Polling Service', ()=>{
            expect(app.pollingService).toBeDefined();
        });

        it('should create Home Component', ()=>{
            expect(app.homeComponent).toBeDefined();
        });
    });

    describe('bootstrap', ()=> {
        let homeActivateSpy = jasmine.createSpy('homeComponent.activate');

        app.pollingService = jasmine.createSpyObj('PollingService Spy',['start','init']);

        app.homeComponent = {
            activate: homeActivateSpy
        };

        app.bootstrap();

        it('should init polling service', ()=>{
            "use strict";
           expect(app.pollingService.init).toHaveBeenCalled();
        });

        it('should start polling service', () => {
            expect(app.pollingService.start).toHaveBeenCalled();
        });

        it('should activate home component', () => {
            expect(homeActivateSpy).toHaveBeenCalled();
        });
    });

});
