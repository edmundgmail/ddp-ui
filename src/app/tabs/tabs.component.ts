import {Component, Input, OnInit} from '@angular/core';
import {Tab} from '../models/tab';
import {MatTabChangeEvent} from "@angular/material";
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators/map';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import {CoreService} from '../services/core.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ScriptSimple} from "../models/script-simple";

export abstract class TabsComponent implements OnInit {
  protected currentIndex: number = -1;

  protected tabs: Tab[] = [];
  protected placeHolder: string;

  protected myControl: FormControl = new FormControl();

  protected options = [];

  protected filteredOptions: Observable<string[]>;

  protected runUrl: string;
  protected scriptUrl: string;

  constructor(protected http: HttpClient, protected coreService: CoreService) {
  }


  ngOnInit() {
    //this.http.get(this.coreService.baseUrl +'sp').subscribe(res=> this.options = res.json() as string[]);
    this.http.get(this.scriptUrl).subscribe(res=> {
      console.log("res = " + res);
      this.options = (res as ScriptSimple[]).map(r=>r.name);
    });


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
        this.options.push(this.myControl.value);
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

  closeTab(){
    if(this.currentIndex>-1) {
      this.tabs.splice(this.currentIndex, 1);
      if(this.tabs.length == 0) this.currentIndex = -1;
    }

  }

  tabChanged (tabChangeEvent: MatTabChangeEvent)
  {
    this.currentIndex = tabChangeEvent.index;
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
  }

  runTab() {
    if(this.currentIndex>-1){
      const tab = this.tabs[this.currentIndex];

      const x:string = JSON.stringify(tab);
      let httpOptions = this.coreService.httpOptions;

      this.http.post(this.runUrl, x, httpOptions).subscribe(
        res => this.updateResult(res),
        err=> this.updateErrorResult(err));
    }
  }

  private updateResult(res) {
    if(res !== undefined) {
        this.tabs[this.currentIndex].result += JSON.stringify(res) + "\n";
    }
  }

  private updateErrorResult(res) {
    if(res !== undefined) {
      this.tabs[this.currentIndex].result += JSON.stringify(res.error) + "\n";
    }
  }

  saveTab() {
    if(this.currentIndex>-1){
      const tab = this.tabs[this.currentIndex];
      const x:string = JSON.stringify(tab);

      let httpOptions = this.coreService.httpOptions;


      this.http.post(this.scriptUrl, x, httpOptions).subscribe(  res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
    }
  }

  loadTab(name:string) {
    //todo
    this.http.get(this.scriptUrl+'/'+name).subscribe(res=> {
      console.log("res = " + res);
      const t = (res as Tab);

      let i = this.tabs.map(t=>t.name).indexOf(t.name);
      if(i == -1) {
        var tab = new Tab(t.name, t.content);
        this.tabs.push(tab)
      }
      else {
        this.tabs[i].content = t.content;
      }
    });

  }
}
