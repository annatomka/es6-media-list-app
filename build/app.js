define(['exports', './api/api.service', './polling/polling.service', './event-emitter/event.emitter', './home/home.component'], function (exports, _api, _polling, _event, _home) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var App = exports.App = function () {
        function App(jQuery) {
            _classCallCheck(this, App);

            this.apiService = new _api.ApiService(jQuery);
            this.eventEmitter = new _event.EventEmitter();
            this.pollingService = new _polling.PollingService(this.eventEmitter, this.apiService);
            this.homeComponent = new _home.HomeComponent(this.eventEmitter);
        }

        _createClass(App, [{
            key: 'bootstrap',
            value: function bootstrap() {
                this.pollingService.init();
                this.pollingService.start();
                this.homeComponent.activate();
            }
        }]);

        return App;
    }();
});