import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {Album} from "../../objects/album";
import {LatLngBoundsLiteral} from "angular2-google-maps/core";

@Component({
  selector: 'fp-map',
  templateUrl: './map.component.html',
  styleUrls: ['../user.component.css']
})
export class MapComponent implements OnInit {
  zoom = 3;
  lat = 41.9102415;
  lng = 12.2416594;

  private lastClicked;
  @Input() albums: Album[];
  @Input() albumId;
  @Output() showInfoBoard = new EventEmitter();
  @Output() changeInfo = new EventEmitter<Album>();
  constructor(){}

  ngOnInit(){}
  more(){
    this.showInfoBoard.emit();
  }
  change(album, infoWindow){
    this.changeInfo.emit(album);
    if (this.lastClicked && this.lastClicked !== infoWindow){
      this.lastClicked.close();
    }
    this.lastClicked = infoWindow;
  }
  autoPan(album){
    // alert(this.albumId == album.albumId);
    return (this.albumId == album.albumId);
  }
}
