import {Component, Input, OnInit} from '@angular/core';
import {Tab} from '../models/tab';
import {MatTabChangeEvent} from "@angular/material";
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {CoreService} from '../services/core.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['../app.component.css']
})

export class TabsComponent implements OnInit {
  @Input('type') type: string;
  currentIndex: number = -1;

  tabs: Tab[] = [];
  placeHolder: string;

  myControl: FormControl = new FormControl();

  protected options = ['a','b'];

  filteredOptions: Observable<string[]>;

  constructor(protected http: Http, protected coreService: CoreService) {
  }

  ngOnInit() {
    if(this.type == 'sql'){
      this.placeHolder = 'Please input SQL snippet';
    }
    else if(this.type=='scala'){
      this.placeHolder = 'Please input scala code';
    }

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

  addTab() {
    var tab = new Tab();
    tab.name = "New";
    tab.content = "this is my tab";
    this.tabs.push(tab)
  }

  loadTab() {
    var tab = new Tab();
    tab.name = "New*";
    tab.content = "this is my tab";
    this.tabs.push(tab)
  }

  saveTab() {
    const x : Tab = this.tabs[this.currentIndex];
    console.log("myScript=" + this.tabs[this.currentIndex].content);
  }

  closeTab(){
    if(this.currentIndex>-1) this.tabs.splice(this.currentIndex, 1);
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
