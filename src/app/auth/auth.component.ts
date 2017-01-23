import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ShareService} from "../share.service";

@Component({
  selector: 'fp-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit{
  isSignup:boolean = true;
  constructor(private router:Router) {}

  ngOnInit(){
    if(ShareService.userInfo.isSigned){
      this.router.navigate(['home']);
    }else{
      ShareService.getUserInfo().subscribe(
        data => {
          if(ShareService.userInfo.isSigned){
            this.router.navigate(['home']);
          }
        }
      )
    }
  }

  switchView(){
    this.isSignup = !this.isSignup;
  }
  toHome(){
    this.router.navigate(['home']);
  }
}
