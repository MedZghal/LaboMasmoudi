import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {BackendService} from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: BackendService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let loggedIn :any;
    this.authenticationService.authenticationState.subscribe(async state => {
      loggedIn = state;
    });

    if(loggedIn)
      return true;

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
