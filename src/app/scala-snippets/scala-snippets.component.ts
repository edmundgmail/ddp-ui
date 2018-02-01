import { Component, OnInit } from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {HttpClient} from '@angular/common/http';
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

  constructor(protected http: HttpClient, protected coreService: CoreService, protected ws : WebSocketService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.placeHolder = "Please input scala code";
    this.http.get(this.coreService.baseUrl +'sp/scala/script').subscribe(res=> {
      console.log("res = " + res);
      this.options = (res as ScriptSimple[]).map(r=>r.name);
    });
  }

  runTab(tab: Tab){
    let body = JSON.stringify(tab);
    console.log(body)

    let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions();

    //options.headers = headers;
    return this.http.post(this.coreService.baseUrl+'sp/scala/run', body)
      .subscribe(
        data => {console.log("succeeded"); this.onResetForm(); this.httpresult='success';},
        (err: Response) => {
          this.httpresult = `Backend returned code ${err.status}, body was: ${err.text()}`
        }
      );

  }

  saveTab() {
    if(this.currentIndex>-1){
      const x:string = JSON.stringify(this.tabs[this.currentIndex]);
      console.log("x=" + x);
      this.http.post(this.coreService.baseUrl + 'sp/scala/script', x)
    }
  }


  onResetForm() {

  }



}
