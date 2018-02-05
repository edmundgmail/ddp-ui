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
  httpresult;
  runUrl;
  scriptUrl;

  constructor(protected http: HttpClient, protected coreService: CoreService, protected ws : WebSocketService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.placeHolder = "Please input scala code";
    this.scriptUrl = this.coreService.baseUrl + 'sp/scala/script';
    this.runUrl = this.coreService.baseUrl + 'sp/scala/run';

    this.http.get(this.scriptUrl).subscribe(res=> {
      console.log("res = " + res);
      this.options = (res as ScriptSimple[]).map(r=>r.name);
    });
  }


  runTab() {
    if(this.currentIndex>-1){
      const tab = this.tabs[this.currentIndex];

      const x:string = JSON.stringify(tab);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token',
          'Cache-Control': 'no-cache',
          'Cache-control': 'no-store',
          'Pragma': 'no-cache',
          'Expires': '0'
        })
      };


      this.http.post(this.runUrl, x, httpOptions).subscribe(
        res => this.updateResult(res)
        err=> this.updateResult(err));
    }
  }

  private updateResult(res) {
    if(res !== undefined) {
      if(res.status===200)
        this.tabs[this.currentIndex].result += JSON.stringify(res.error.text) + "\n";
      else
        this.tabs[this.currentIndex].result += JSON.stringify(res.error) + "\n";
    }
  }

  saveTab() {
    if(this.currentIndex>-1){
      const tab = this.tabs[this.currentIndex];

      const x:string = JSON.stringify(tab);
      console.log("x=" + x);
      console.log("tab=" + JSON.stringify(tab));
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
        })
      };


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


  onResetForm() {

  }



}
