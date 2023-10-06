import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(private httpClient: HttpClient) {}

  private url = 'https://chat-backend-xgmsewclfa-uc.a.run.app';
  //private url = 'http://localhost:5000';

  //private url = 'https://ambev-reports-backend-xgmsewclfa-uc.a.run.app';

  public sendToBackend(jsonData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      }),
    };

    return this.httpClient.post(
      this.url + '/api/report',
      jsonData,
      httpOptions
    );
  }
  public sendToBackendChat(jsonData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      }),
    };

    return this.httpClient.post(
      this.url + '/api/chat',
      jsonData,
      httpOptions
    );
  }
}
