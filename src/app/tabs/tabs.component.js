"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tab_1 = require("../models/tab");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var map_1 = require("rxjs/operators/map");
var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
        this.currentIndex = -1;
        this.tabs = [];
        this.myControl = new forms_1.FormControl();
        this.options = [];
    }
    TabsComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.http.get(this.coreService.baseUrl +'sp').subscribe(res=> this.options = res.json() as string[]);
        this.filteredOptions = this.myControl.valueChanges
            .pipe(operators_1.startWith(''), map_1.map(function (val) { return _this.filter(val); }));
    };
    TabsComponent.prototype.filter = function (val) {
        return this.options.filter(function (option) {
            return option.toLowerCase().indexOf(val.toLowerCase()) === 0;
        });
    };
    TabsComponent.prototype.addTab = function () {
        var tab = new tab_1.Tab();
        tab.name = "New";
        tab.content = "this is my tab";
        this.tabs.push(tab);
    };
    TabsComponent.prototype.loadTab = function () {
        var tab = new tab_1.Tab();
        tab.name = "New*";
        tab.content = "this is my tab";
        this.tabs.push(tab);
    };
    TabsComponent.prototype.saveTab = function () {
        var x = this.tabs[this.currentIndex];
        console.log("myScript=" + this.tabs[this.currentIndex].content);
    };
    TabsComponent.prototype.closeTab = function () {
        if (this.currentIndex > -1)
            this.tabs.splice(this.currentIndex, 1);
    };
    TabsComponent.prototype.runTab = function (tab) {
    };
    TabsComponent.prototype.tabChanged = function (tabChangeEvent) {
        this.currentIndex = tabChangeEvent.index;
        console.log('tabChangeEvent => ', tabChangeEvent);
        console.log('index => ', tabChangeEvent.index);
    };
    TabsComponent = __decorate([
        core_1.Component({
            selector: 'app-tabs',
            templateUrl: './tabs.component.html',
            styleUrls: ['../app.component.css']
        })
    ], TabsComponent);
    return TabsComponent;
}());
exports.TabsComponent = TabsComponent;
