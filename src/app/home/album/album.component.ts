import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ShareService} from "../../share.service";

@Component({
  selector: 'fp-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  noAlbum=false;
  private searchText='';
  constructor(private router:Router) { }

  ngOnInit() {
  }

  newAlbum(){
    this.router.navigate(['create']);
  }

  isSigned(){
    return ShareService.userInfo.isSigned;
  }
  showNoAlbumMsg(){
    this.noAlbum=true;
  }
  allAlbums(){
    this.router.navigate(['home/']);
  }
  search(){
    this.router.navigate(['home/'+this.searchText],{fragment: 'recommend'});
  }
}
