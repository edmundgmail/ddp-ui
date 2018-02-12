import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class CoreService {
  baseUrl = 'http://localhost:5000/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };

/*{
  headers: new HttpHeaders({
  'Content-Type':  'application/json',
  'Authorization': 'my-auth-token',
  'Cache-Control': 'no-cache',
  'Cache-control': 'no-store',
  'Pragma': 'no-cache',
  'Expires': '0'
})
};*/

  constructor() { }

}
