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
}
