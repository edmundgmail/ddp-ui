import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {NewDataSourceDialogComponent} from './new-data-source-dialog/new-data-source-dialog.component';
import {DataSourceInfo} from '../models/DataSourceInfo';

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
      ELEMENT_DATA.push(result);
    });
  }
}


const ELEMENT_DATA: DataSourceInfo[] = [];

