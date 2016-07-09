define(["./list.controller"], function (_list) {
    "use strict";

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = function App(listController) {
        _classCallCheck(this, App);

        listController.list();
    };

    var listController = new _list.MyList();
    var app = new App(listController);
});