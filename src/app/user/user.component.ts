import {Component, OnInit, Input} from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {HttpService} from "../http.service";
import {Album} from "../objects/album";
import {Image} from "../objects/image";

@Component({
  selector: 'fp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [HttpService]
})
export class UserComponent implements OnInit {
  albumId:number;
  userId:number;
  albums: Album[]=[];
  left:string="0";
  addPhotoBoard = false;
  showImage = false;
  private clickedImage=null;

  currentAlbum: Album;

  constructor(private route: ActivatedRoute, private http:HttpService ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.userId = params['userId'];
      this.albumId = params['albumId'];
    });
    this.loadData();
  }
  loadData(){
    this.http.getAlbumListByUser(this.userId).subscribe(
      data => {
        var images = [];
        data = data.results;
        for (let item of data) {
          images = [];
          for (let image of item.images) {
            images.push(new Image(image.image));
          }
          this.albums.push(new Album(
            item.id,
            item.users[0].id,
            item.name,
            item.description,
            {
              name: item.geo.name,
              lat: +item.geo.lat,
              lng: +item.geo.lng
            },
            images,
            item.users[0].username
          ));
        }
        if(this.albumId){
          for(let album of this.albums){
            if(this.albumId==album.albumId){
              this.currentAlbum = album;
            }
          }
        }else{
          this.currentAlbum = this.albums[0];
        }
      }
    );
  }

  changeInfo(album){
    this.currentAlbum=album;
  }
  showInfoBoard(){
    this.left='0';
  }
  close(){
    this.left="-480px";
  }
  closeAddBoard(){
    this.addPhotoBoard = false;
  }
  showImageBoard(image){
    this.clickedImage=image;
    this.showImage = true;
  }
  closeImage(){
    this.showImage = false;
  }
  addphoto(){
    this.addPhotoBoard = true;
  }
}
