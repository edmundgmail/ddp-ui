import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sql-snippets',
  templateUrl: './sql-snippets.component.html',
  styleUrls: ['../app.component.css']
})
export class SqlSnippetsComponent implements OnInit {
  qtd:any[] = [];

  constructor() { }

  ngOnInit() {
  }

}
