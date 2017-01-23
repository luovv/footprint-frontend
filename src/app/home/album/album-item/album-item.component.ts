import { Component, Input } from '@angular/core';
import { Album } from "../../../objects/album";

@Component({
  selector: 'fp-album-item',
  templateUrl: './album-item.component.html',
  styleUrls: ['../album.component.css']
})
export class AlbumItemComponent {
  @Input() album:Album;

  constructor() { }

}
