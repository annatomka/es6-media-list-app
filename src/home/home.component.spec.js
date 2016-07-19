import { HomeComponent } from './home.component';

describe('HomeComponent', ()=> {
    "use strict";
    let eventEmitterSpy;

    beforeEach(()=> {
        eventEmitterSpy = jasmine.createSpyObj("EventEmitter", ['on', 'emit']);
    });

    describe('activate', ()=> {
        let homeComponent;

        beforeEach(()=> {
            homeComponent = new HomeComponent(eventEmitterSpy)
        });

        it('should call super activate with #home element', ()=>{
            let homeComponentSuper = Object.getPrototypeOf(HomeComponent.prototype);
            spyOn(homeComponentSuper, 'activate');
            homeComponent.activate();
            expect(homeComponentSuper.activate).toHaveBeenCalledWith($('#home'));
        });

        it('should call allMediaListComponent activate', ()=>{
            spyOn(homeComponent.allMediaListComponent, 'activate');
            homeComponent.activate();
            expect(homeComponent.allMediaListComponent.activate).toHaveBeenCalled();
        });

        it('should call watchLaterListComponent activate', ()=>{
            spyOn(homeComponent.watchLaterListComponent, 'activate');
            homeComponent.activate();
            expect(homeComponent.watchLaterListComponent.activate).toHaveBeenCalled();
        });
    });
});