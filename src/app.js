import { MyList } from "./list.controller";

class App {
    constructor(listController) {
        listController.list();
    }
}

const listController = new MyList();
var app = new App(listController);