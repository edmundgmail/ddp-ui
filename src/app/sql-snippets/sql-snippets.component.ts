import {Component, Input, OnInit} from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {Http} from '@angular/http';
import {CoreService} from '../services/core.service';
import {WebSocketService} from '../services/websocket.service';
import {Subject} from 'rxjs/Subject';
import {Message} from '../models/message';
import {HttpClient} from '@angular/common/http';
import {ScriptSimple} from '../models/script-simple';

const CHAT_URL = "ws://localhost:9000/ws";

@Component({
  selector: 'app-sql-snippets',
  templateUrl: '../tabs/tabs.component.html',
  styleUrls: ['../app.component.css']
})

export class SqlSnippetsComponent extends TabsComponent implements OnInit {
  protected options = [];

  constructor(protected http: HttpClient, protected coreService: CoreService, protected ws : WebSocketService) {
    super();

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
  }

  ngOnInit() {
    super.ngOnInit();
    this.http.get(this.coreService.baseUrl +'sp').subscribe(res=> {
      console.log("res = " + res);
      this.options = (res as ScriptSimple[]).map(r=>r.name);
    });

  }

}
