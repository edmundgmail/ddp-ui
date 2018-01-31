import { Component, OnInit } from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {HttpClient} from '@angular/common/http';
import {CoreService} from '../services/core.service';
import {WebSocketService} from '../services/websocket.service';
import {ScriptSimple} from '../models/script-simple';

@Component({
  selector: 'app-scala-snippets',
  templateUrl: '../tabs/tabs.component.html',
  styleUrls: ['../app.component.css']
})
export class ScalaSnippetsComponent extends TabsComponent implements OnInit {


  constructor(protected http: HttpClient, protected coreService: CoreService, protected ws : WebSocketService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.http.get(this.coreService.baseUrl +'scala').subscribe(res=> {
      console.log("res = " + res);
      this.options = (res as ScriptSimple[]).map(r=>r.name);
    });
  }

}
