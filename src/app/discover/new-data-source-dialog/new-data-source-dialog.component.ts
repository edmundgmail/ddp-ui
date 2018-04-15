import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataSourceInfo} from '../discover.component';
import {isEmpty} from 'rxjs/operator/isEmpty';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-data-source-dialog',
  templateUrl: './new-data-source-dialog.component.html',
  styleUrls: ['../../app.component.css']
})
export class NewDataSourceDialogComponent {
  newDataSourceGroup: FormGroup;

  types = [
    {"id": DataSourceInfo.JDBC, "name": "jdbc"},
    {"id": DataSourceInfo.HIVE, "name": "hive"},
    {"id": DataSourceInfo.LOCALFILE, "name": "Local File"}
  ];

  dataSourceType = 0;

  constructor(
    public dialogRef: MatDialogRef<NewDataSourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataSourceInfo,
    private fb: FormBuilder
    ) {

    this.newDataSourceGroup = fb.group({
      dataSourceNameCtrl: this.fb.control(null),
      dataSourceTypeCtrl: this.fb.control(null),
      dataSourceTypeJDBCUrlCtrl: this.fb.control(null),
    });

    this.onChanges();

    if(data != null)
      console.log("data.name="+data.name + ",data.type="+data.type);
    else
      console.log("data is empty")
  }

  onChanges(): void {
    this.newDataSourceGroup.get('dataSourceTypeCtrl').valueChanges.subscribe(val => {
      this.dataSourceType = val;
    });
  }

  updateData() : void {
    this.data.name = this.newDataSourceGroup.get("dataSourceNameCtrl").value;
    this.data.type = this.newDataSourceGroup.get("dataSourceTypeCtrl").value;
  }

  onFormSubmit() : void {
    this.updateData();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  testConnection() : void {
    this.updateData();

    if(this.dataSourceType == DataSourceInfo.JDBC) {

    }
  }
}
