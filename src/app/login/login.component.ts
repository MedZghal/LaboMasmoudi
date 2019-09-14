import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendService} from '../backend.service';
import Swal from 'sweetalert2';
import {catchError, timeout} from 'rxjs/operators';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService :BackendService
      ) {
        //redirect to home if already logged in
        if (this.authenticationService.isAuthenticated()) {
          this.router.navigate(['/']);
        }
      }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    let dataParam = new FormData();
    dataParam.append('user',this.f.username.value);
    dataParam.append('pass',this.f.password.value);

    this.authenticationService.post('login/',dataParam ).pipe(
      timeout(10000),
      catchError(e => {

        let status = e.status;

        console.log(e);
        if(e.name !== undefined)
          if(e.name === "TimeoutError")
            Toast.fire({
              type: 'error',
              title: 'Le délai d\'attente est écoulé'
            });
          else{
            if(status === 404)
              Toast.fire({
                type: 'error',
                title: 'Le mot de passe ou l\'utilisateur entré est incorrect'
              });
          }

        throw new Error(e);
      })
    )
      .subscribe(
        (data:any) => {
          console.log(data);
          this.loading = false;
          Toast.fire({
            type: 'success',
            title: 'Bienvenue '+ data.user
          });
          this.router.navigate(['/Dashboard']);
        },
        error => {
          console.log(error);
          this.loading = false;
        });
  }

  gotoAccueil() {
    this.authenticationService.logIn();
  }
}
