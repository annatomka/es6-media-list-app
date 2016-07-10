define(['./config', './app.constants', './api/api.service', './polling/polling.service', './event-emitter/event.emitter'], function (_config, _app, _api, _polling, _event) {
    'use strict';

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

    var App = function () {
        function App() {
            _classCallCheck(this, App);

            this.apiService = new _api.ApiService(_config.config, jQuery);
            this.eventEmitter = new _event.EventEmitter();
            this.pollingService = new _polling.PollingService(_config.config, _app.constants, this.eventEmitter, this.apiService);
        }

        _createClass(App, [{
            key: 'bootstrap',
            value: function bootstrap() {
                this.pollingService.start();
                this.eventEmitter.on(_app.constants.EVENT_POLLING_RESULT, function (result) {
                    console.log('result arrived ', result);
                });
            }
        }]);

        return App;
    }();

    var app = new App();
    app.bootstrap();
});