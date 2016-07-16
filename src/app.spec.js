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
        let pollingStartSpy = jasmine.createSpy('pollingService.start');
        let homeActivateSpy = jasmine.createSpy('homeComponent.activate');

        app.pollingService = {
            start: pollingStartSpy
        };

        app.homeComponent = {
            activate: homeActivateSpy
        };

        app.bootstrap();

        it('should start polling service', () => {
            expect(pollingStartSpy).toHaveBeenCalled();
        });

        it('should activate home component', () => {
            expect(homeActivateSpy).toHaveBeenCalled();
        });
    });

});
