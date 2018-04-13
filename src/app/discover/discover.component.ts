import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {
  displayedColumns = ['name', 'type'];
  dataSource = new MatTableDataSource<DataSource>(ELEMENT_DATA);
  constructor() { }

  ngOnInit() {
  }

}

export interface DataSource {
  name: string;
  type: string;
}

const ELEMENT_DATA: DataSource[] = [
];

