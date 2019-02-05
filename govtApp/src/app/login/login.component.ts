import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { ApiService } from '../app.service';
import { ComponentService } from '../service/component.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  loginvar: any;
  status : boolean = false;

  constructor(private apiService: ApiService, private sharingService: ComponentService, private router: Router, private formBuilder: FormBuilder) {

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

      this.sharingService.setUser(this.loginForm.controls.username.value);

    this.apiService.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));

      this.router.navigateByUrl('/welcome');
    }, error => {
      this.invalidLogin = true;
    });
  }

  ngOnInit() {
    this.status = this.sharingService.getStatus();
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

}
