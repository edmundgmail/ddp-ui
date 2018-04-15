export class DataSourceInfo {
  public static JDBC : number = 1;
  public static HIVE : number = 2;
  public static LOCALFILE : number = 3;

  public static types = [
    {"id": DataSourceInfo.JDBC, "name": "jdbc"},
    {"id": DataSourceInfo.HIVE, "name": "hive"},
    {"id": DataSourceInfo.LOCALFILE, "name": "Local File"}
  ];


  public static getDataSourceNameByType(id: number) : string {
    return DataSourceInfo.types.find(x=>x.id == id).name;
  }

  name: string;
  type: number;

  jdbc: JDBCConnection;
}


export interface JDBCConnection {
  url: string;
  database: string;
  user: string;
  pass: string;
  sql: string;
}
