import {Component, Input, OnInit} from '@angular/core';
import {Tab} from '../models/tab';
import {MatTabChangeEvent} from "@angular/material";
import {__core_private_testing_placeholder__} from "@angular/core/testing";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['../app.component.css']
})

export class TabsComponent implements OnInit {
  @Input('type') type: string;
  currentIndex: number = 0;

  tabs: Tab[] = [];
  placeHolder: string;

  constructor() {
  }

  ngOnInit() {
    if(this.type == 'sql'){
      this.placeHolder = 'Please input SQL snippet';
    }
    else if(this.type=='scala'){
      this.placeHolder = 'Please input scala code';
    }
  }

  addTab() {
    var tab = new Tab();
    tab.name = "New*";
    tab.content = "this is my tab";
    this.tabs.push(tab)
  }

  saveTab() {
    const x : Tab = this.tabs[this.currentIndex];
    console.log("myScript=" + x.content);
  }

  removeTab(tab: Tab){
    this.tabs = this.tabs.filter(x=> x != tab)
  }

  tabChanged (tabChangeEvent: MatTabChangeEvent)
  {
    this.currentIndex = tabChangeEvent.index;
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  trackByIndex(index, item){
    return index;
  }
}
