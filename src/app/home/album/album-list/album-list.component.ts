import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Album } from "../../../objects/album";
import { Image } from "../../../objects/image";
import {HttpService} from "../../../http.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {ShareService} from "../../../share.service";

@Component({
  selector: 'fp-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['../album.component.css'],
  providers: [HttpService]
})
export class AlbumListComponent implements OnInit{
  @Input() type;
  @Output() noAlbum = new EventEmitter();
  albums:Album[] = [];
  private userid;
  private searchText;

  constructor(private http:HttpService, private router: Router, private route:ActivatedRoute) {}

  ngOnInit(){
    if(this.type==1) {
      this.route.params.subscribe(
        params => {
          this.searchText = params['search'];
          this.showRecommendAlbum();
        }
      )
    }

    if(this.type==0){
      if(ShareService.userInfo.isSigned) {
        this.userid = ShareService.userInfo.id;
        this.showMyAlbum();
      }else{
        ShareService.getUserInfo().subscribe(
          data => {
            this.userid = data.id;
            this.showMyAlbum();
          }
        );
      }
    }else{
      this.showRecommendAlbum();
    }
  }

  showMyAlbum(){
    this.http.getAlbumListByUser(this.userid).subscribe(
      data => {
        var images=[];
        data=data.results;
        for(let item of data){
          images=[];
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
        if(this.albums.length==0){
          this.noAlbum.emit();
        }
      }
    );
  }

  showRecommendAlbum(){
    this.http.getAlbumList(this.searchText).subscribe(
      data => {
        var images=[];
        this.albums=[];
        data=data.results;
        for(let item of data){
          images=[];
          if(item.images.length>0) {
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
        }
      }
    );
  }

  toUserPage(userId, albumId){
    this.router.navigate(["user/"+userId+"/"+albumId]);
  }
}
