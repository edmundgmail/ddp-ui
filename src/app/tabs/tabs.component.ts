import {Component, Input, OnInit} from '@angular/core';
import {Tab} from '../models/tab';
import {MatTabChangeEvent} from "@angular/material";
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {CoreService} from '../services/core.service';

export abstract class TabsComponent implements OnInit {
  currentIndex: number = -1;

  tabs: Tab[] = [];
  placeHolder: string;

  myControl: FormControl = new FormControl();

  protected options = [];

  filteredOptions: Observable<string[]>;

  constructor() {
  }

  ngOnInit() {
    //this.http.get(this.coreService.baseUrl +'sp').subscribe(res=> this.options = res.json() as string[]);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  onKeyPress(ev) {
    if(ev.key == 'Enter'){
      if(this.options.indexOf(this.myControl.value) >= 0) {
        this.loadTab(this.myControl.value);
      }
      else {
        this.addTab(this.myControl.value);
      }
    }
  }

  addTab(name: string) {
    let i = this.tabs.map(t=>t.name).indexOf(name);
    if(i == -1) {
      var tab = new Tab(name, this.placeHolder);
      this.tabs.push(tab)
    }
    else {
      //todo: put the focus
    }

  }

  abstract loadTab(name: string) : void

  abstract saveTab() : void

  closeTab(){
    if(this.currentIndex>-1) {
      this.tabs.splice(this.currentIndex, 1);
      if(this.tabs.length == 0) this.currentIndex = -1;
    }

  }

  runTab(tab: Tab){

  }

  tabChanged (tabChangeEvent: MatTabChangeEvent)
  {
    this.currentIndex = tabChangeEvent.index;
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }
}
