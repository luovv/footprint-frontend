import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Album} from "../../objects/album";
import {Image} from "../../objects/image";

@Component({
  selector: 'fp-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['../user.component.css']
})
export class ShowImageComponent implements OnInit {
  @Input() album:Album;
  @Input() image:Image;
  @Output() close = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  closeImage(){
    this.close.emit();
  }
}
