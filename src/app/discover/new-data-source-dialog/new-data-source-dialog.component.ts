import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {isEmpty} from 'rxjs/operator/isEmpty';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataSourceInfo} from '../../models/DataSourceInfo';

@Component({
  selector: 'app-new-data-source-dialog',
  templateUrl: './new-data-source-dialog.component.html',
  styleUrls: ['../../app.component.css']
})
export class NewDataSourceDialogComponent {
  newDataSourceGroup: FormGroup;
  types = DataSourceInfo.types;

  dataSourceType = '';

  constructor(
    public dialogRef: MatDialogRef<NewDataSourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataSourceInfo,
    private fb: FormBuilder
    ) {

    this.newDataSourceGroup = fb.group({
      dataSourceNameCtrl: this.fb.control(null),
      dataSourceTypeCtrl: this.fb.control(null),
      dataSourceTypeJDBCUrlCtrl: this.fb.control(null),
      dataSourceTypeJDBCDatabaseNameCtrl: this.fb.control(null),
      dataSourceTypeJDBCUserNameCtrl: this.fb.control(null),
      dataSourceTypeJDBCPasswordCtrl: this.fb.control(null),
      dataSourceTypeJDBCSQLCtrl: this.fb.control(null),
    });

    this.onChanges();
    this.loadData(data);
  }

  loadData(data: DataSourceInfo) : void
  {
    this.newDataSourceGroup.get('dataSourceNameCtrl').setValue(data.name);
    this.newDataSourceGroup.get('dataSourceTypeCtrl').setValue(data.type);

    if(data.type == DataSourceInfo.JDBC){
      this.newDataSourceGroup.get('dataSourceTypeJDBCUrlCtrl').setValue(data.jdbc.url);
      this.newDataSourceGroup.get('dataSourceTypeJDBCDatabaseNameCtrl').setValue(data.jdbc.database);
      this.newDataSourceGroup.get('dataSourceTypeJDBCUserNameCtrl').setValue(data.jdbc.user);
      this.newDataSourceGroup.get('dataSourceTypeJDBCPasswordCtrl').setValue(data.jdbc.pass);
      this.newDataSourceGroup.get('dataSourceTypeJDBCSQLCtrl').setValue(data.jdbc.sql);
    }
  }

  onChanges(): void {
    this.newDataSourceGroup.get('dataSourceTypeCtrl').valueChanges.subscribe(val => {
      this.dataSourceType = val;
    });
  }

  updateData() : void {
    this.data.name = this.newDataSourceGroup.get("dataSourceNameCtrl").value;
    this.data.type = this.newDataSourceGroup.get("dataSourceTypeCtrl").value;

    if(this.data.type == DataSourceInfo.JDBC) {
      this.data.jdbc.url = this.newDataSourceGroup.get("dataSourceTypeJDBCUrlCtrl").value;
      this.data.jdbc.database = this.newDataSourceGroup.get("dataSourceTypeJDBCDatabaseNameCtrl").value;
      this.data.jdbc.user = this.newDataSourceGroup.get("dataSourceTypeJDBCUserNameCtrl").value;
      this.data.jdbc.pass = this.newDataSourceGroup.get("dataSourceTypeJDBCPasswordCtrl").value;
      this.data.jdbc.sql = this.newDataSourceGroup.get("dataSourceTypeJDBCSQLCtrl").value;
    }

  }

  onFormSubmit() : void {
    this.updateData();
    //TODO: save the data into mongodb
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
