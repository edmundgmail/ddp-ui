import { Component, OnInit } from '@angular/core';
import {Tab} from '../models/tab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit {
  tabs: Tab[] = [];

  constructor() { }

  ngOnInit() {
  }

  addTab() {
    var tab = new Tab();
    tab.title = "hello";
    tab.content = "this is my tab";
    this.tabs.push(tab)
  }

  removeTab(tab: Tab){
    this.tabs = this.tabs.filter(x=> x != tab)
  }


}
