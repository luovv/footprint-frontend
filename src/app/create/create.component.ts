import {Component, OnInit, NgZone, ViewChild, ElementRef} from '@angular/core';
import {HttpService} from "../http.service";
import {MapsAPILoader} from 'angular2-google-maps/core';
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [HttpService]
})

export class CreateComponent implements OnInit {
  form = {name:'', description:'',geo:{name:'',lat:null,lng:null}};
  errorMsg = '';
  invalid = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(private http: HttpService, private _loader: MapsAPILoader, private ngZone: NgZone, private router:Router) { }

  ngOnInit() {
    // this.searchControl = new FormControl();

    this._loader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(regions)"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.form.geo.name = place.name;
          this.form.geo.lat = place.geometry.location.lat().toFixed(7);
          this.form.geo.lng = place.geometry.location.lng().toFixed(7);
        });
      });
    });
  }

  submit(){
    this.http.postCreateAlbum(this.form).subscribe(
      data => {
        this.router.navigate(["user/"+data.users[0]+"/"+data.id]);
      },
      error => {
        // alert(error.json());
        this.errorMsg = error.json().detail;
        this.invalid=true;
      }
    );
  }
}
