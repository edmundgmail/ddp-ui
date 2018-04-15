import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {NewDataSourceDialogComponent} from './new-data-source-dialog/new-data-source-dialog.component';
import {DataSourceInfo} from '../models/DataSourceInfo';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/typings/esm5/collections';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['../app.component.css']
})
export class DiscoverComponent implements OnInit {
  displayedColumns = ['name', 'type', 'actions'];
  dataSource = new MatTableDataSource<DataSourceInfo>(ELEMENT_DATA);


  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog(data:DataSourceInfo): void {
    let dialogRef = this.dialog.open(NewDataSourceDialogComponent, {
      data: data==null? {'name': '', 'type' : ''} : data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const data = this.dataSource.data;
      data.push(result);
      this.dataSource.data = data;
    });
  }
}

const ELEMENT_DATA : DataSourceInfo[] = [
  {"name": "s1", "type" : "JDBC", "description" : "this is jdbc", jdbc: null}
];


class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<DataSourceInfo[]> = new BehaviorSubject<DataSourceInfo[]>([]);
  get data(): DataSourceInfo[] { return this.dataChange.value; }

  constructor() {
  }

  removeElement(e: number[]) {
    //const copiedData = this.data.filter( d=>e.indexOf(d.position) < 0).slice();
    //this.dataChange.next(copiedData);
  }

  /** Adds a new user to the database. */
  addElement(e: DataSourceInfo) {
    const copiedData = this.data.slice();
    copiedData.push() ; //TODO : add code
    this.dataChange.next(copiedData);
  }
}


