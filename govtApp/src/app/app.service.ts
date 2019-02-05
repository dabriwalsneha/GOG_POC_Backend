import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:8080/user-portal/';

  login(loginPayload) {
    const headers = {
      'Authorization': 'Basic ' + btoa('my-client-id:my-secret-key'),
      'Content-type': 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.baseUrl + 'oauth/token', loginPayload, {headers});
  }

}