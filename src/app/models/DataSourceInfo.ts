import {Data} from '@angular/router';

export class DataSourceInfo {
  public static JDBC : string = 'JDBC';
  public static HIVE : string = 'HIVE';
  public static LOCALFILE : string = "LOCALFILE";

  public static types = [
    DataSourceInfo.JDBC,DataSourceInfo.HIVE,DataSourceInfo.LOCALFILE
  ];

  name: string;
  type: string;
  description: string;

  jdbc: JDBCConnection;
}


export interface JDBCConnection {
  url: string;
  database: string;
  user: string;
  pass: string;
  sql: string;
}
