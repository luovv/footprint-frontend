import {Component, OnInit, EventEmitter, Output, Input, OnChanges} from '@angular/core';
import {Album} from "../../objects/album";
import {ShareService} from "../../share.service";
import {HttpService} from "../../http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'fp-info-board',
  templateUrl: './info-board.component.html',
  styleUrls: ['../user.component.css'],
})
export class InfoBoardComponent implements OnInit, OnChanges{
  @Output() close = new EventEmitter();
  @Output() addphoto = new EventEmitter();
  @Output() showImage = new EventEmitter();
  @Input() album:Album;
  private isMyAlbum=false;

  constructor(private http:HttpService, private router:Router){}

  ngOnInit(){}
  ngOnChanges(){
    if(this.album && ShareService.userInfo.isSigned){
      if(this.album.userId==ShareService.userInfo.id){
        this.isMyAlbum = true;
      }
    }
  }

  addPhotoBoard(){
    this.addphoto.emit();
  }
  showImageBoard(image){
    this.showImage.emit(image);
  }
  closeInfoBoard(){
    this.close.emit();
  }
  deleteAlbum(){
    if(confirm("Are you sure you want to delete this album? All images in this album will be deleted.")) {
      this.http.deleteAlbum(this.album.albumId).subscribe(
        data => {
          this.router.navigate(['user/' + this.album.userId]);
        },
        error => {
          this.router.navigate(['user/' + this.album.userId]);
        }
      );
    }
  }
}
