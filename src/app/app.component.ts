import {Component, OnInit} from '@angular/core';
import {HttpService} from "./http.service";
import {ShareService} from "./share.service";
import {Router} from "@angular/router";


@Component({
  selector: 'fp-home',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HttpService]
})

export class AppComponent implements OnInit{
  title = 'app';
  constructor(private http:HttpService, private router:Router){}
  ngOnInit(){
    this.http.getVerify().subscribe(
      data => {
        var userInfo = {
          isSigned: true,
          id: data.results[0].id,
          username: data.results[0].username
        };
        ShareService.setUserInfo(userInfo);
      },
      error => {
      }
    )
  }
}
