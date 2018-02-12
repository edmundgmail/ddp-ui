import { Component, OnInit } from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CoreService} from '../services/core.service';
import {WebSocketService} from '../services/websocket.service';
import {ScriptSimple} from '../models/script-simple';
import {RequestOptions} from "@angular/http";
import {Tab} from "../models/tab";

@Component({
  selector: 'app-scala-snippets',
  templateUrl: '../tabs/tabs.component.html',
  styleUrls: ['../app.component.css']
})

export class ScalaSnippetsComponent extends TabsComponent implements OnInit {
  constructor(protected http: HttpClient, protected coreService: CoreService) {
    super(http,coreService);
  }

  ngOnInit() {
    this.placeHolder = "Please input scala code";
    this.scriptUrl = this.coreService.baseUrl + 'sp/scala/script';
    this.runUrl = this.coreService.baseUrl + 'sp/scala/run';
    super.ngOnInit();

  }

  private parseScalaPackageName(s: string) : string {
    var myRegexp = /(?:^|\s)package\s+(\w+)/g;

  }

  saveTab() {
    if(this.currentIndex>-1){
      const tab = this.tabs[this.currentIndex];
      let name = this.parseScalaPackageName(tab.content);

      const x:string = JSON.stringify(tab);

      let httpOptions =this.coreService.httpOptions;

      this.http.post(this.scriptUrl, x, httpOptions).subscribe(  res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        });
    }
  }

}
