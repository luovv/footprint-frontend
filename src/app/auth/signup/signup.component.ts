import { Component, Output, EventEmitter } from '@angular/core';
import {HttpService} from "../../http.service";
import {ShareService} from "../../share.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fp-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.component.css'],
  providers: [HttpService]
})
export class SignupComponent{
  form = {username:'', email:'', password:''};
  errorMsg = '';
  invalid = false;
  @Output() switchView = new EventEmitter();

  constructor(private http:HttpService, private router:Router) { }

  signup() {
    this.http.postSignup(this.form).subscribe(
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

  switchToSignin(){
    this.switchView.emit();
  }
}
