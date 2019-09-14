import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url = 'https://www.labo-benyoussef.tn/api/v1';
  authenticationState = new BehaviorSubject(true);
  constructor(private router: Router,
              private http: HttpClient) { }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  logIn() {
    this.authenticationState.next(true);
    this.router.navigate(['/Accueil']);

  }

  logout() {
    this.authenticationState.next(false);
    this.router.navigate(['/login']);
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  gettExtr(endpoint: string) {
    return this.http.get(endpoint);
  }

  postReq(endpoint: string, body: any) {
    return this.http.post(this.url + '/' + endpoint, body);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
