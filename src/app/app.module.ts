import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import 'rxjs/add/operator/map';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './home/album/album.component';
import { AlbumListComponent } from './home/album/album-list/album-list.component';
import { AlbumItemComponent } from './home/album/album-item/album-item.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { MapComponent } from './user/map/map.component';
import { InfoBoardComponent } from './user/info-board/info-board.component';
import {AUTH_PROVIDERS} from "angular2-jwt";
import { CreateComponent } from './create/create.component';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import { AddPhotoComponent } from './user/add-photo/add-photo.component';
import { ShowImageComponent } from './user/show-image/show-image.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    AlbumComponent,
    AlbumListComponent,
    AlbumItemComponent,
    HeaderComponent,
    UserComponent,
    MapComponent,
    InfoBoardComponent,
    CreateComponent,
    FileSelectDirective,
    FileDropDirective,
    AddPhotoComponent,
    ShowImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'home', component: HomeComponent },
      { path: 'home/:search', component: HomeComponent },
      { path: 'user/:userId/:albumId', component: UserComponent },
      { path: 'user/:userId', component: UserComponent },
      { path: 'create', component: CreateComponent }
    ]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDDZeBuSzKTcbTmQ8VQlXj1q_IrFG-ccDY',
      libraries: ['places'],
      language:'en'
    })
  ],
  providers: [AUTH_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {

}
