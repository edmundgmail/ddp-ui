import {Component, Input, OnInit} from '@angular/core';
import {TabsComponent} from '../tabs/tabs.component';
import {Http} from '@angular/http';
import {CoreService} from '../services/core.service';

@Component({
  selector: 'app-sql-snippets',
  templateUrl: '../tabs/tabs.component.html',
  styleUrls: ['../app.component.css']
})
export class SqlSnippetsComponent extends TabsComponent implements OnInit {
  @Input()
  protected options: string[] = ['One',
  'Two',
  'Three'];

  constructor(protected http: Http, protected coreService: CoreService) {
    super(http,coreService);
  }

  ngOnInit() {
  }

}
