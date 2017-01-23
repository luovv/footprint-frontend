import { Component, Output, EventEmitter } from '@angular/core';
import {HttpService} from "../../http.service";
import {Router} from "@angular/router";
import {ShareService} from "../../share.service";

@Component({
  selector: 'fp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../auth.component.css'],
  providers: [HttpService]
})
export class SigninComponent {
  form = {email:'', password:''};
  errorMsg = '';
  invalid = false;
  @Output() switchView = new EventEmitter();

  constructor(private http: HttpService, private router:Router) { }

  signin() {
    this.http.postSignin(this.form).subscribe(
      data => {
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('uid', data.id);
        localStorage.setItem('username', data.username);
        var userInfo = {
          isSigned: true,
          id: data.id,
          username: data.username
        };
        ShareService.setUserInfo(userInfo);
        this.router.navigate(['home']);
      },
      error => {
        this.errorMsg = error.json().msg;
        this.invalid=true;
      }
    );
  }
  switchToSignup(){
    this.switchView.emit();
  }
}
