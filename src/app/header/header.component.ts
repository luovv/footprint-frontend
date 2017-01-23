import {Component, OnInit} from '@angular/core';
import {ShareService} from "../share.service";
import {Router} from "@angular/router";
import {HttpService} from "../http.service";

@Component({
  selector: 'fp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{
  userInfo = {
    isSigned: false,
    id: 0,
    username: ''
  };
  private searchText='';

  constructor(private router:Router, private http:HttpService) {
    ShareService.getUserInfo().subscribe(
      userInfo => {
        this.userInfo = userInfo;
      }
    );
  }

  myAlbums(){
    this.router.navigate(['home']);
  }

  isSigned(){
    return ShareService.userInfo.isSigned;
  }

  toHome(){
    this.router.navigate(['']);
  }
  search(){
    this.router.navigate(['home/'+this.searchText],{fragment: 'recommend'});
  }
  myMaps(){
    this.router.navigate(["user/"+this.userInfo.id]);
  }
  logOut(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('uid');
    localStorage.removeItem('username');
    var userInfo = {
      isSigned: false,
      id: null,
      username:null
    };
    ShareService.setUserInfo(userInfo);
    location.reload();

  }
}
