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
  displayedColumns = ['name', 'type', 'description', 'actions'];
  dataSource: MatTableDataSource<DataSourceInfo>;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<DataSourceInfo>();
  }

  openDialog(data:DataSourceInfo): void {
    let dialogRef = this.dialog.open(NewDataSourceDialogComponent, {
      data: data==null? new DataSourceInfo() : data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result) {
        const data = this.dataSource.data;
        data.push(result);
        this.dataSource.data = data;
      }
    });
  }
}


