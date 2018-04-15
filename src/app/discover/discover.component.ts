import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {NewDataSourceDialogComponent} from './new-data-source-dialog/new-data-source-dialog.component';

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
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

export class DataSourceInfo {
  public static JDBC : number = 1;
  public static HIVE : number = 2;
  public static LOCALFILE : number = 3;

  name: string;
  type: number;
}

const ELEMENT_DATA: DataSourceInfo[] = [
  {"name" : "oracle-jdbc-connect", "type": DataSourceInfo.JDBC}
];

