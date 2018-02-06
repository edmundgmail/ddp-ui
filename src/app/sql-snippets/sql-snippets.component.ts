import {Component, Input, OnInit} from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {Http} from '@angular/http';
import {CoreService} from '../services/core.service';
import {WebSocketService} from '../services/websocket.service';
import {Subject} from 'rxjs/Subject';
import {Message} from '../models/message';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ScriptSimple} from '../models/script-simple';

const CHAT_URL = "ws://localhost:5000/ws";

@Component({
  selector: 'app-sql-snippets',
  templateUrl: '../tabs/tabs.component.html',
  styleUrls: ['../app.component.css']
})

export class SqlSnippetsComponent extends TabsComponent implements OnInit {
  constructor(protected http: HttpClient, protected coreService: CoreService) {
    super(http,coreService);
  }

    /*
    this.messages   = <Subject<Message>>this.ws
    .connect(CHAT_URL)
   .map((response: MessageEvent): Message => {
     let data = JSON.parse(response.data);
     return {
       author : data.author,
       message: data.message,
       newDate: data.newDate
     }
   });

  this.messages.subscribe(msg => {
     console.log(msg);
   });
  */
  ngOnInit() {
    this.placeHolder = "Please input SQL statement"
    this.scriptUrl = this.coreService.baseUrl + 'sp/sql/script';
    this.runUrl = this.coreService.baseUrl + 'sp/sql/run';
    super.ngOnInit();
  }

}
