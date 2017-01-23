import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {HttpService} from "../../http.service";
import {Album} from "../../objects/album";
import {Router} from "@angular/router";

const URL = 'http://ec2-52-212-250-18.eu-west-1.compute.amazonaws.com/api/image/create/';

@Component({
  selector: 'fp-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['../user.component.css'],
})

export class AddPhotoComponent{
  @Input() album:Album;
  @Output() close = new EventEmitter();

  constructor(private http:HttpService, private router:Router){}

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  private flag;
  upload(){
    var item;
    var data;
    var image;
    var thisComponent = this;
    var fileReader;

    var size = this.uploader.queue.length;
    var count = 0;
    for(item of this.uploader.queue){
      fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        image = e.target.result;
        data = {
          name:'',
          description:'',
          image:image,
          album: thisComponent.album.albumId
        };
        thisComponent.http.postCreateImage(data).subscribe(
          data => {
            count++;
            if(count==size){
              location.reload();
            }
          },
          error => {
            count++;
            if(count==size){
              location.reload();
            }
          }
        );
      };
      fileReader.readAsDataURL(item._file);
    }
  }
  closeInfoBoard(){
    this.close.emit();
  }
}
